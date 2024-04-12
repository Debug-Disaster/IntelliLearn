const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const cookie = require('cookie')
const User = require('../models/user')
require('dotenv').config()
const generateToken = async(last_name, first_name, email, role) => {
    const primaryToken = jwt.sign({last_name, first_name, email, role}, process.env.SECRET_KEY, {expiresIn: '1d'})
    const refreshToken = jwt.sign({last_name, first_name, email, role}, process.env.SECOND_SECRET_KEY, {expiresIn: '7d'})
    return {primaryToken, refreshToken}
}
const getUser = async(primaryToken, refreshToken) => {
    try{
        const verifiedPrimary = jwt.verify(primaryToken, process.env.SECRET_KEY);
        if(verifiedPrimary.email){
            const email = verifiedPrimary.email
            const user = await User.findOne({email}).select('-password -emailConfirmationCode')
            console.log(user)
            return {user};
        }else{
                const refreshVerified = jwt.verify(refreshToken, process.env.SECOND_SECRET_KEY);
                if(refreshVerified){
                    const {newToken, newRefreshToken} = await generateToken(refreshVerified.last_name, refreshVerified.first_name, refreshVerified.email, refreshVerified.role)
                    const refreshedUser = await User.findOne({email: refreshVerified.email})
                    return {user: refreshedUser, newPrimaryToken: newToken, newRefreshToken: newRefreshToken}
                }
        }
        return null
    }catch(err){
        console.log(err)
        if (err.name === 'TokenExpiredError') {
                const refreshVerified = jwt.verify(refreshToken, process.env.SECOND_SECRET_KEY);
                if (refreshVerified) {
                   try{
                        const user = await User.findOne({email: refreshVerified.email}).select('-password -emailConfirmationCode')
                        const {newToken, newRefreshToken} = await generateToken(refreshVerified.last_name, refreshVerified.first_name, refreshVerified.email, refreshVerified.role)
                        return {user, newPrimaryToken: newToken, newRefreshToken}
                   }catch(err){
                     return null;
                   }
                }
        }
        return null;
    }
}
router.post('/register', async(req, res) => {
    try{
        const {last_name, first_name, email, password, role, status, school, major, subjects, confirmPassword, user_photo, username} = req.body
        if(!last_name || !first_name || !email || !password || !username){
            return res.status(400).json({success: false, error: 'Please fill in all fields'})
        }
        const userExistsWithThisEmail = await User.findOne({email})
        if(userExistsWithThisEmail){
            return res.status(400).json({success:false, error: 'User with this email already exists'})
        }
        const userExistsWithTheseNames = await User.findOne({last_name, first_name})
        if(userExistsWithTheseNames){
            return res.status(400).json({success:false, error: 'User with these names already exists'})
        }
        if(password !== confirmPassword){
            return res.status(400).json({success: false, error: 'Passwords do not match'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({last_name, first_name, email, password: hashedPassword, role, status, school, major, subjects, user_photo, username})
        await user.save()
        const {primaryToken, refreshToken} = await generateToken(last_name, first_name, email, role)
        console.log(primaryToken, refreshToken)
        res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'none', secure: true})
        res.cookie('primaryToken', primaryToken, {httpOnly: true, sameSite: 'none', secure: true})
        res.status(201).json({success: true, message: 'User created successfully'})
    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
})
router.post('/login', async(req, res) => {
   try{
        const {query, password} = req.body
        const user = await User.findOne({$or: [{email: query}, {username: query}]})
        if(!user){
            return res.status(400).json({success: false, error: 'User not found'})
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({success: false, error: 'Invalid password'})
        }
        const {primaryToken, refreshToken} = await generateToken(user.last_name, user.first_name, user.email, user.role)
        res.cookie('refreshToken', refreshToken, {httpOnly: true}).cookie('primaryToken', primaryToken, {httpOnly: true}).status(200).json({success: true, message: 'User logged in successfully'})
   }catch(error){
       res.status(500).json({success: false, error: error.message})
   }
})
router.get('/getUser', async(req, res) => {
    try{
        const cookies = cookie.parse(req.headers.cookie)
        const primaryToken = cookies.primaryToken
        const refreshToken = cookies.refreshToken
        if(!primaryToken || !refreshToken){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const {user, newPrimaryToken, newRefreshToken} = await getUser(primaryToken, refreshToken)
        if(!user){
            return res.status(401).json({success:false, error: 'Unauthorized'})
        }
        if(newPrimaryToken && newRefreshToken){
            return res.cookie('primaryToken', newPrimaryToken, {httpOnly: true}).cookie('refreshToken', newRefreshToken, {httpOnly: true}).status(200).json({success: true, user})
        }
        res.cookie('primaryToken', primaryToken, refreshToken).status(200).json({success: true, user})
    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
});
router.post('/logout', async(req, res) => {
    try{
        res.clearCookie('primaryToken').clearCookie('refreshToken').status(200).json({success: true, message: 'User logged out successfully'})
    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
})
router.post('/emailConfirmation/:id', async(req, res) => {
    try{
        const emailId = req.params.id
        const user = await User.findOne({emailId})
        if(!user){
            return res.status(400).json({success: false, error: 'User not found'})
        }
        if(user.emailConfirmed){
            return res.status(400).json({success: false, error: 'Email already confirmed'})
        }
        if(user.emailConfirmationCode !== req.body.emailConfirmationCode){
            return res.status(400).json({success: false, error: 'Invalid email confirmation code'})
        }
        if(user.emailConfirmationCodeExpiresAt < new Date()){
            return res.status(400).json({success: false, error: 'Email confirmation code expired'})
        }
        user.emailConfirmed = true
        await user.save()
        res.status(200).json({success: true, message: 'Email confirmed successfully'})
    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
})
router.get('/resendEmailConfirmation/:email', async(req, res) => {
    try{
        const email = req.params.email
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success: false, error: 'User not found'})
        }
        if(user.emailConfirmed){
            return res.status(400).json({success: false, error: 'Email already confirmed'})
        }
        if(user.emailConfirmationCodeExpiresAt < new Date()){
            return res.status(400).json({success: false, error: 'Email confirmation code expired'})
        }
        user.emailConfirmationCode = Math.floor(100000 + Math.random() * 900000).toString()
        await user.save()
        res.status(200).json({success: true, message: 'Email confirmation code resent successfully'})
    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
})
module.exports = router
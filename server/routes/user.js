const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const generateToken = async(last_name, first_name, email, role) => {
    const primaryToken = await jwt.sign({last_name, first_name, email, role}, process.env.SECRET_KEY, {expiresIn: '1d'})
    const refreshToken = await jwt.sign({last_name, first_name, email, role}, process.env.SECOND_SECRET_KEY, {expiresIn: '7d'})
    return {primaryToken, refreshToken}
}
const getUser = async(primaryToken, refreshToken) => {
    try{
        
        const verifiedPrimary = jwt.verify(primaryToken, process.env.SECRET);
        if(verifiedPrimary.email){
            const email = verifiedPrimary.email
            const user = await User.findOne({email}).select('-password -emailConfirmationCode')
            return user;
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
        const {last_name, first_name, email, password, role, status} = req.body
        const userExistsWithThisEmail = await User.findOne({email})
        const userExistsWithTheseNames = await User.findOne({last_name, first_name})
        if(userExistsWithThisEmail){
            return res.status(400).json({error: 'User with this email already exists'})
        }
        if(userExistsWithTheseNames){
            return res.status(400).json({error: 'User with these names already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const emailConfirmationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({last_name, first_name, email, password: hashedPassword, role, status, emailConfirmationCode})
        await user.save()
        const {primaryToken, refreshToken} = await generateToken(last_name, first_name, email, role)
        res.cookie('refreshToken', refreshToken, {httpOnly: true}).cookie('primaryToken', primaryToken, {httpOnly: true}).status(201).json({success: true, message: 'User created successfully'})
    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
})
router.post('/login', async(req, res) => {
   try{
        const {email, password} = req.body
        const user = await User.findOne({email})
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
        if(!req || !req.cookies){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const primaryToken = req.cookies.primaryToken
        const refreshToken = req.cookies.refreshToken
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
module.exports = router
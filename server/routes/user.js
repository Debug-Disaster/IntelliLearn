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
        if(verifiedPrimary.username){
            const username = verified.username
            const user = await User.findOne({username}).select('-password -emailConfirmationCode')
            return user;
        }else{
                const refreshVerified = jwt.verify(refreshToken, process.env.SECOND_SECRET_KEY);
                if(refreshVerified){
                    const newToken = jwt.sign({username: refreshVerified.username}, process.env.SECRET, {expiresIn: '1d'})
                    const newRefreshToken = jwt.sign({username: refreshVerified.username}, process.env.SECOND_SECRET_KEY, {expiresIn: '7d'})
                    const refreshedUser = await User.findOne({username: refreshVerified.username})
                    return {user: refreshedUser, primaryToken: newToken, refreshToken: newRefreshToken}
                }
        }
        return null
    }catch(err){
        if (err.name === 'TokenExpiredError') {
                // Token has expired
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
router.post('/login', (req, res) => {
   
})
module.exports = router
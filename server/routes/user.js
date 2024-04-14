const jwt = require('jsonwebtoken')
const passwordValidator = require('password-validator');
let schema = new passwordValidator();
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const cookie = require('cookie')
const User = require('../models/user')
const Clase = require('../models/clasroom')
require('dotenv').config()
const getUser = require('../utils/getUser')
const generateToken = async(last_name, first_name, email, role) => {
    const primaryToken = jwt.sign({last_name, first_name, email, role}, process.env.SECRET_KEY, {expiresIn: '1d'})
    const refreshToken = jwt.sign({last_name, first_name, email, role}, process.env.SECOND_SECRET_KEY, {expiresIn: '7d'})
    return {primaryToken, refreshToken}
}
schema
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
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
        // const userExistsWithTheseNames = await User.findOne({last_name, first_name})
        // if(userExistsWithTheseNames){
        //     return res.status(400).json({success:false, error: 'User with these names already exists'})
        // }
        const userExistsWithUsername = await User.findOne({username})
        if(userExistsWithUsername)
            return res.status(400).json({success: false, error: 'User with this username already exists'})
        if(password !== confirmPassword){
            return res.status(400).json({success: false, error: 'Passwords do not match'})
        }
        if(password.length < 8)
            return res.status(400).json({success: false, error: 'Password must be at least 8 characters long'});
        if(!schema.validate(password))
            return res.status(400).json({success: false, error: 'Password too weak!'});
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)    
        const user = new User({last_name, first_name, email, password: hashedPassword, role, status, school, major, subjects, user_photo, 
        username, gender:'Not set', age: 'Not set', bio: 'Not set', stars: 5, starVotes: [{name: 'Alex', star: 5}], user_photo: username})
        await user.save()
        const {primaryToken, refreshToken} = await generateToken(last_name, first_name, email, role)
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
        res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'none', secure: true})
        res.cookie('primaryToken', primaryToken, {httpOnly: true, sameSite: 'none', secure: true})
        res.status(201).json({success: true, message: 'User logged in successfully'})
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
router.get('/getUser/:username', async(req, res) =>{
    try{
        const {username} = req.params;
        const user = await User.findOne({username}).select('-id -password');
        if(!user){
            return res.status(400).json({success: false, error: 'Invalid user'})
        }
        res.status(200).json({success: true, user})
    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
})

router.post('/giveStars', async(req, res) =>{{
    try{
        const {mentor, student, stars} = req.body;

        const verifUser = await User.findOne({
            starVotes: {
              $elemMatch: {
                name: student
              }
            }
          })
        if(verifUser){
            return res.status(400).json({success: false, error: 'You have already rated this mentor'});
        }

        const updatedData = {   
            $addToSet:{
                starVotes:{name:student, star:stars}
            },
        }
        const Userr = await User.findOneAndUpdate({username: mentor}, updatedData);
        
        const user = await User.aggregate([
            { $match: { username: mentor } },
            { $unwind: "$starVotes" },
            {
                $group: {
                    _id: "$_id",
                    averageStars: { $avg: "$starVotes.star" }
                }
            }
        ]);
        await User.updateOne({ username: mentor }, { stars: user[0].averageStars });

        res.status(200).json({ success: true});
        
    }catch(error){
        res.status(500).json({success: false, error: error.message});
    }
}})

router.post('/updateProfilePhoto', async(req, res) =>{
    try{
        const {username, user_photo} = req.body;
        const user = await User.findOneAndUpdate({ username: username}, {user_photo: user_photo})
        console.log(user);
        res.status(200).json({ success: true});
    }catch(error){
        res.status(500).json({success: false, error: error.message});
    }
})

router.get('/search', async(req, res)=>{
    try{
        const {search} = req.query
        const studentSearches = await User.find({ username: search, role: 'student'});
        const mentorSearches = await User.find({ username: search, role: 'mentor'});
        const classSearches = await Clase.find({ subject: search});
        const searchData={
            students: studentSearches,
            mentors: mentorSearches,
            classes: classSearches
        }
        res.status(200).json({searchData});
    }catch(error){
        res.status(500).json({success: false, error: error.message});
    }
})
module.exports = router
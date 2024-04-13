const express = require('express')
const router = express.Router()
const classroom = require('../models/clasroom')
const User = require('../models/user')
const getUser = require('../utils/getUser')
const cookie = require('cookie')
const bcrypt = require('bcrypt')
router.get('/', async(req, res) => {
    try{
        const cookies = cookie.parse(req.headers.cookie)
        const {user} = await getUser(cookies.primaryToken, cookies.refreshToken)
        if(!user){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const classrooms = await classroom.find({})
        return res.status(200).json({success: true, classrooms})
    }catch(err){
        return res.status(500).json({success: false, error: 'Internal Server Error'})
    }
})
router.get('/:id', async(req, res) => {
    try{
        const classroomId = req.params.id
        const classroomData = await classroom.findOne({_id: classroomId})
        return res.status(200).json({success: true, classroomData})
    }catch(err){
        return res.status(500).json({success: false, error: 'Internal Server Error'})
    }
})
router.post('/publish', async(req, res) => {
    try{
        const cookies = cookie.parse(req.headers.cookie)
        const {mentor, subject, description, classroom_photo, status, password} = req.body
        if(!mentor || !subject || !description || !classroom_photo || !status){
            return res.status(400).json({success: false, error: 'Please fill in all fields'})
        }
        const {user} = await getUser(cookies.primaryToken, cookies.refreshToken)
        if(!user){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const newClassroom = new classroom({mentor, subject, description, classroom_photo, status, courses: [], password: hashedPassword, assignments: [], announcements: [], students: []})
        await newClassroom.save()
        return res.status(201).json({success: true, message: 'Classroom published successfully'})
    }catch(err){
        return res.status(500).json({success: false, error: err.message})
    }
})
router.put('/update/:id', async(req, res) => {
    try{
        const cookies = cookie.parse(req.headers.cookie)
        const classroomId = req.params.id
        const {mentor, subject, description, classroom_photo, status} = req.body
        const {user} = getUser(cookies.primaryToken, cookies.refreshToken)
        if(!user){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        await classroom.findOneAndUpdate({_id: classroomId}, {mentor, subject, description, classroom_photo, status})
        return res.status(200).json({success: true, message: 'Classroom updated successfully'})
    }catch(err){
        return res.status(500).json({success: false, error: 'Internal Server Error'})
    }
})
///fix
router.delete('/delete/:id', async(req, res) => {
    try{
        const cookies = cookie.parse(req.headers.cookie)
        const classroomId = req.params.id
        const {user} = getUser(cookies.primaryToken, cookies.refreshToken)
        if(!user){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        await classroom.findOneAndDelete({_id: classroomId})
        return res.status(200).json({success: true, message: 'Classroom deleted successfully'})
    }catch(err){
        return res.status(500).json({success: false, error: 'Internal Server Error'})
    }
})
router.post('/join/:id', async(req, res) => {
    try{
        const cookies = cookie.parse(req.headers.cookie)
        const classroomId = req.params.id
        const {user} = await getUser(cookies.primaryToken, cookies.refreshToken)
        if(!user){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const classroomData = await classroom.findOne({_id: classroomId})
        if(!classroomData){
            return res.status(404).json({success: false, error: 'Classroom not found'})
        }
        if(classroomData.students.includes(user.username)){
            return res.status(400).json({success: false, error: 'You have already joined this classroom'})
        }
        user.classrooms.push(classroomData)
        await user.save()
        await classroom.findOneAndUpdate({_id: classroomId}, {$push: {students: user.username}})
        return res.status(200).json({success: true, message: 'You have joined the classroom'})
    }catch(err){
        return res.status(500).json({success: false, error: 'Internal Server Error'})
    }
})
router.get('/myclasses/:username', async(req, res) => {
    try{
        const {username} = req.params
        if(!req.headers.cookie){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const cookies = cookie.parse(req.headers.cookie)
        if(!cookies || !cookies.primaryToken || !cookies.refreshToken){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const {user} = await getUser(cookies.primaryToken, cookies.refreshToken)
        if(!user){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        if(user.username !== username){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const usera = await User.findOne({username}).select('-id -password')
        if(!usera){
            return res.status(404).json({success: false, error: 'User not found'})
        }
        const classrooms = await classroom.find({students: user.username}).select('-students -password')
        return res.status(200).json({success: true, classrooms})
    }catch(err){
        return res.status(500).json({success: false, error: err.message})
    }
})
module.exports = router
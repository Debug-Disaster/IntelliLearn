const express = require('express')
const router = express.Router()
const classroom = require('../models/clasroom')
const User = require('../models/user')
const getUser = require('../utils/getUser')
const cookie = require('cookie')
router.get('/', async(req, res) => {
    try{
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
        const {mentor, subject, description, classroom_photo, status} = req.body
        if(!mentor || !subject || !description || !classroom_photo || !status){
            return res.status(400).json({success: false, error: 'Please fill in all fields'})
        }
        const {user} = await getUser(cookies.primaryToken, cookies.refreshToken)
        if(!user){
            return res.status(401).json({success: false, error: 'Unauthorized'})
        }
        const newClassroom = new classroom({mentor, subject, description, classroom_photo, status})
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
///
module.exports = router
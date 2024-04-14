const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema({
    mentor: {
        type: String,
        required: true
    },
    students: {
        type: Array,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classroom_photo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    courses: {
        type: Array,
        required: true
    },
    assignments: {
        type: Array,
        required: true
    },
    lessons:{
        type: Array,
        required: true
    },
    announcements: {
        type: Array,
        required: true
    },
    chat: {
        type: Array,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('classroom', classroomSchema)
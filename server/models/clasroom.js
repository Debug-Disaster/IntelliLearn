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
    }
}, {timestamps: true})

module.exports = mongoose.model('classroom', classroomSchema)
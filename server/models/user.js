const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    last_name : {
        type: String,
        required: true
    },
    first_name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    status : {
        type: String,
    },
    user_photo: {
        type: String,
    },
    school : {
        type: String,
        required: true
    },
    major : {
        type: String,
        required: true
    },
    subjects : {
        type: Array,
        required: true
    },
    username : {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)
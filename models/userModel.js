const mongoose = require('mongoose')

const auth_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    university_roll: {
        type: Number,
        required: true
    },
    student_no: {
        type: Number,
        required: true
    },
    is_hosteler: {
        type: Boolean,
        required: true
    },
    branch: {
        type: String,
        required:true
    },
    contact_no: {
        type: Number,
        required:true
    },
    section: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    confirm_password: {
        type: String,
        required:true
    }
})
const auth_Model = mongoose.model('users', auth_schema)
module.exports = auth_Model;
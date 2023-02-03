const mongoose = require('mongoose')

const auth_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    }
})
const auth_Model = mongoose.model('users', auth_schema)
module.exports = auth_Model;
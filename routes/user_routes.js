const express = require('express')
const userController = require('../controllers/userController')
const route = express.Router()

route.post('/register',userController.userRegistration)

module.exports = route
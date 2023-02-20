const express = require('express')
const userController = require('../controllers/userController')
const route = express.Router()

route.post('/register',userController.userRegistration)
route.post('/login',userController.userLogin)
route.post('/verifyotp',userController.verifyotp)

module.exports = route
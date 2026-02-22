const { Router } = require('express')
const { authController } = require('../controllers')

const authRoutes = Router()

authRoutes.post('/login', authController.login)
authRoutes.post('/register', authController.register)
authRoutes.post('/forgot-password', authController.forgot_password)
authRoutes.post('/reset-password', authController.reset_password)
module.exports = authRoutes
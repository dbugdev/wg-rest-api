const { postRegister, postLogin } = require('../controllers/authController')
const { validateRegistration, validateLogin } = require('../middlewares')

const router = require('express').Router()

router.post('/register', validateRegistration, postRegister)
router.post('/login', validateLogin, postLogin)

module.exports = router

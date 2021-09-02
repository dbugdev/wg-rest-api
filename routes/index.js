const router = require('express').Router()
const createError = require('http-errors')
const isAuth = require('../middlewares/auth/isAuth')
const authRouter = require('./authRouter')
const productRouter = require('./productRouter')

router.use('/auth', authRouter)
router.use('/products', isAuth, productRouter)

router.use((req, res, next) => {
  next(createError.NotFound())
})

module.exports = router

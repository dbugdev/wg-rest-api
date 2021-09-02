const { validationResult } = require('express-validator')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const { JwtHandler } = require('../middlewares')
module.exports.postRegister = async (req, res, next) => {
  try {
    const error = validationResult(req).mapped()
    if (Object.keys(error).length) {
      throw createError(422, { message: error })
    }
    const hashpass = await bcrypt.hash(req.body.password, 12)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashpass,
    })
    const result = await user.save()
    if (!result) {
      throw createError(500, 'Error while saving the user')
    }
    return res.json({
      message: 'User registration successful',
    })
  } catch (err) {
    next(err)
  }
}
module.exports.postLogin = async (req, res, next) => {
  try {
    const error = validationResult(req).mapped()
    if (Object.keys(error).length) {
      throw createError(422, { message: error })
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw createError.Unauthorized('Invalid Credentials')
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
      throw createError.Unauthorized('Invalid Credentials')
    }
    let token = JwtHandler.sign({ userId: user._id, name: user.name })
    token = `Bearer ${token}`
    return res.json({
      token,
    })
  } catch (err) {
    next(err)
  }
}

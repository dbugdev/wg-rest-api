const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')

module.exports = async (req, res, next) => {
  try {
    if (!req.get('Authorization')) {
      throw createError.Unauthorized('Unauthorized')
    }
    const token = req.get('Authorization').split(' ')[1]
    if (!token) {
      throw createError.Unauthorized('Unauthorized')
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        throw createError.Unauthorized('Unauthorized')
      } else {
        req.userId = decoded.userId
        next()
      }
    })
  } catch (err) {
    next(err)
  }
}

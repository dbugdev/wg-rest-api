const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')
class JwtHandler {
  static sign(payload, expiry = '1h', secret = JWT_SECRET) {
    return jwt.sign(payload, secret, {
      expiresIn: expiry,
    })
  }
}
module.exports = JwtHandler

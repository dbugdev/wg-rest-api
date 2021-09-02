const { body } = require('express-validator')
const { User } = require('../../models/User')
module.exports = [
  body('name')
    .isLength({
      min: 3,
    })
    .withMessage('Name should contain atleast 3 letters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value) => {
      return User.exists({ email: value }).then((exist) => {
        if (exist) {
          return Promise.reject('Email already exist')
        }
      })
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password should be 6 characters long including atleast 1 lowercase,1 uppercase, 1 number and 1 symbol'
    ),
]

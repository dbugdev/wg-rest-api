const { body } = require('express-validator')
const { User } = require('../../models/User')
module.exports = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('Product name must be atleast 3 charecters long'),
  body('price')
    .isInt({
      min: 0,
    })
    .withMessage('Please enter a valid price'),
]

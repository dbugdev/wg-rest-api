const { validationResult, query } = require('express-validator')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const { JwtHandler } = require('../middlewares')
const { Product } = require('../models/Product')
const { isValidObjectId } = require('mongoose')
module.exports.getProducts = async (req, res, next) => {
  try {
    const nameFromSearch = req.query.name || ''
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (+page - 1) * limit
    const products = await Product.find(
      {
        user: req.userId,
        name: {
          $regex: nameFromSearch,
          $options: 'i',
        },
      },
      '-user'
    )
      .skip(skip)
      .limit(limit)
    res.json({ data: products })
  } catch (err) {
    next(err)
  }
}
module.exports.postProduct = async (req, res, next) => {
  try {
    const error = validationResult(req).mapped()
    if (Object.keys(error).length) {
      throw createError(422, { message: error })
    }
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      user: req.userId,
    })
    const result = await product.save()
    if (!result) {
      throw createError.InternalServerError('Error while saving')
    }
    return res.json({ data: result })
  } catch (err) {
    next(err)
  }
}
module.exports.getProductById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw createError(400, 'Invalid product id')
    }
    const product = await Product.findOne(
      {
        _id: req.params.id,
        user: req.userId,
      },
      '-user'
    )
    if (!product) {
      throw createError(400, 'Invalid product id')
    }
    return res.json({
      data: product,
    })
  } catch (err) {
    next(err)
  }
}
module.exports.updateProductById = async (req, res, next) => {
  try {
    const error = validationResult(req).mapped()
    if (Object.keys(error).length) {
      throw createError(422, { message: error })
    }
    if (!isValidObjectId(req.params.id)) {
      throw createError(400, 'Invalid product id')
    }
    const result = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      {
        name: req.body.name,
        price: req.body.price,
        ...(req.body.description && { description: req.body.description }),
      },
      { new: true }
    )
    if (!result) {
      throw createError(400, 'Invalid product id')
    }
    return res.json({
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
module.exports.deleteProductById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      throw createError(400, 'Invalid product id')
    }
    const result = Product.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    })
    if (!result) {
      throw createError(400, 'Invalid product id')
    }
    return res.json({
      message: 'Product Deleted Successfully',
    })
  } catch (err) {
    next(err)
  }
}

const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
})

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const joiRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})

const joiLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
})

const User = model('user', userSchema)

module.exports = { User, joiRegisterSchema, joiLoginSchema }

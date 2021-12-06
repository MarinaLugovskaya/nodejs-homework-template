const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const register = async(req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const result = await User.create({ email, password: hashPassword, subscription })
  res.json({
    status: 201,
    data: {
      user: {
        email,
        subscription
      }
    }
  })
}

module.exports = register

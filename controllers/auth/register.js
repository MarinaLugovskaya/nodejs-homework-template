const { v4: uuidv4 } = require('uuid')
const { Conflict } = require('http-errors')

const { User } = require('../../models')
const sendEmail = require('../../helpers/sendEmail')

const register = async(req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }

  const verificationToken = uuidv4()
  const newUser = new User({ name, email, verificationToken })

  await newUser.setPassword(password)

  await newUser.save()

  const mail = {
    to: email,
    subject: 'подтверждение Email',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
  }
  await sendEmail(mail)
  res.status(201).json({
    status: '200',
    message: 'Verification email sent',
    data: {
      user: {
        email,
        name,
        verificationToken
      }
    }
  })
}

module.exports = register

const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async(data) => {
  const email = { ...data, from: 'anomaliya1993@gmail.com' }
  try {
    await sgMail.send(email)
      .then(() => console.log('Email send success'))
      .catch(error => console.log(error.message))
  } catch (error) {
    throw Error
  }
}

module.exports = {
  sendEmail
}

const { Contact, joiSchema } = require('../../models/contacts')

const addCont = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const contacts = await Contact.create(req.body)
    res.json({
      status: 201,
      data: {
        contacts,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addCont

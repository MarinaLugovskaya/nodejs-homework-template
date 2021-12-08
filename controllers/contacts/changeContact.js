const { Contact } = require('../../models/contacts')

const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!contact) {
      const error = new Error('missing fields')
      error.status = 404
      throw error
    }
    res.json({
      status: 200,
      data: {
        contact,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = changeContact

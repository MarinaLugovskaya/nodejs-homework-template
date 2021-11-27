const { Contact } = require('../../models/contacts')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findByIdAndRemove(contactId)
    if (!contact) {
      const error = new Error('Not found')
      error.status = 404
      throw error
    }

    res.json({
      status: 200,
      message: 'contact deleted',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContact

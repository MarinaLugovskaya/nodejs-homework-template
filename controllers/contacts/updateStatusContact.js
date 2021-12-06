const { Contact } = require('../../models/contacts')

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })

    if (!contact) {
      const error = new Error('missing field favorite')
      error.status = 400
      throw error
    }

    res.json({
      status: 200,
      data: {
        contact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateStatusContact

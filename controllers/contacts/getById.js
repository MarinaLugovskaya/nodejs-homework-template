const { Contact } = require('../../models/contacts')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} Not found`)
      error.status = 404
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

module.exports = getById

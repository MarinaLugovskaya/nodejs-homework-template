const { Contact } = require('../../models/contacts')

const getContacts = async (req, res, next) => {
  const { _id } = req.user
  try {
    const contacts = await Contact.find({ owner: _id }).populate('owner', '_id name email')
    res.json({
      status: 200,
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContacts

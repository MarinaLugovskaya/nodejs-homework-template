const { Contact } = require('../../models/contacts')

const addCont = async (req, res, next) => {
  const { _id } = req.user
  try {
    const contacts = await Contact.create({ ...req.body, owner: _id })
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

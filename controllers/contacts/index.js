const getContacts = require('./getContacts')
const getById = require('./getById')
const addCont = require('./addContacts')
const deleteContact = require('./deleteContact')
const changeContact = require('./changeContact')
const updateStatusContact = require('./updateStatusContact')

module.exports = {
  getContacts,
  getById,
  addCont,
  deleteContact,
  changeContact,
  updateStatusContact
}

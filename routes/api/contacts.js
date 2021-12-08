const express = require('express')
const router = express.Router()

const { auth, validation, ctrlWrapper } = require('../../middlewares')
const { joiSchema, favoriteJoiSchema } = require('../../models/contacts')

const { contacts: ctrl } = require('../../controllers')

router.get('/', auth, ctrlWrapper(ctrl.getContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getById))

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.addCont))

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact))

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.changeContact))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router

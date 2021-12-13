const { Unauthorized } = require('http-errors')
const path = require('path')
const fs = require('fs/promises')
const { User } = require('../../models')
const avatarChange = require('../../services/avatar')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async(req, res) => {
  const { path: tempUpload, originalname } = req.file
  const { _id: id } = req.user
  const imageName = `${id}_${originalname}`
  try {
    const resultUpload = path.join(avatarsDir, imageName)
    await fs.rename(tempUpload, resultUpload)
    await avatarChange(resultUpload)
    const avatarURL = path.join('public', 'avatars', imageName)
    await User.findByIdAndUpdate(req.user._id, { avatarURL })
    res.json({ avatarURL })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw new Unauthorized('message": "Not authorized')
  }
}

module.exports = updateAvatar

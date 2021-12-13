const Jimp = require('jimp')

const avatarСhange = async (url) => {
  const avatar = await Jimp.read(url)
  await avatar.resize(Jimp.AUTO, 250)
  await avatar.writeAsync(url)
}

module.exports = avatarСhange

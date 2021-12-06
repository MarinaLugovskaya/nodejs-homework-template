const getCurrent = async(req, res) => {
  console.log(req.user)
  const { email, subscription } = req.user
  res.json({
    status: 200,
    data: {
      user: {
        email,
        subscription
      }
    }
  })
}

module.exports = getCurrent

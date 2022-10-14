module.exports.checkAuth = (req, res, next) => {
  const { userid } = req.session

  if(!userid) {
    res.redirect('/login')
  }

  next()
}
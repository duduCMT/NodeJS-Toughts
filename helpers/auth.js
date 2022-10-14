module.exports.checkAuth = (req, res, next) => {
  const { userid } = req.session

  console.log(req.session)

  if(!userid) {
    res.redirect('/login')
  }

  next()
}
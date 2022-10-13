const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
  static login(req, res){
    res.render('auth/login')
  }

  static register(req, res){
    res.render('auth/register')
  }

  static registerPost(req, res){
    const { name, email, password, confirmPassword } = req.body

    // Validação de senha
    if(password !== confirmPassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      req.flash('messageClass', 'error')
      res.render('auth/register')
      return
    }

    // res.redirect('auth/login')
  }
}
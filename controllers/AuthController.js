const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
  static login(req, res){
    res.render('auth/login')
  }

  static register(req, res){
    res.render('auth/register')
  }

  static async registerPost(req, res){
    const { name, email, password, confirmPassword } = req.body

    // Validação de senha
    if(password !== confirmPassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      req.flash('messageClass', 'error')
      res.render('auth/register')
      return
    }

    // Validar se usuário existe
    const checkIfUserExists = await User.findOne({where: {email: email}})

    if(checkIfUserExists) {
      req.flash('message', 'O email já está em uso!')
      req.flash('messageClass', 'error')
      res.render('auth/register')
      return
    }

    // Criptografar senha
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = { name, email, password: hashedPassword }

    User.create(user)
      .then((createdUser) => {

        // Inicializar sessão
        req.session.userid = createdUser.id

        req.flash('message', 'Cadastro realizado com sucesso!')
        req.flash('messageClass', 'success')

        req.session.save(() => {
          res.redirect('/')
        })
      })
      .catch(err => console.log(err))
  }
}
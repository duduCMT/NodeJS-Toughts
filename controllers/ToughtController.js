const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
  static showToughts(req, res){
    res.render('toughts/home')
  }
  
  static async dashboard(req, res){
    const { userid } = req.session

    const user = await User.findOne({ 
      where: { id: userid },
      include: Tought,
      plain: true,
    })

    if(!user){
      res.redirect('/login')
      return
    }

    const toughts = user.Toughts.map((result) => result.dataValues)

    res.render('toughts/dashboard', { toughts })
  }

  static async createTought(req, res){
    res.render('toughts/create')
  }

  static async createToughtSave(req, res) {
    const { title } = req.body
    const { userid } = req.session  

    const tought = { title, UserId: userid }

    try {
      await Tought.create(tought)

      req.flash('message', 'Pensamento criado com sucesso.')
      req.flash('messageClass', 'success')
      
      req.session.save(() => {
        res.redirect('/toughts/dashboard') 
      })
    } catch(err) {
      console.log(err)
    }
  }
}
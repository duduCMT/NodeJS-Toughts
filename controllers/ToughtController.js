const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
  static async showToughts(req, res){
    const toughtsData = await Tought.findAll({
      include: User,
    })

    const toughts = toughtsData.map(result => result.get({plain: true}))

    res.render('toughts/home', { toughts })
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

    let emptyToughts = toughts.length === 0

    res.render('toughts/dashboard', { toughts, emptyToughts })
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

  static async removeTought(req, res) {
    const { id } = req.body
    const { userid } = req.session
    
    try {
      await Tought.destroy({where: {id: id, UserId: userid}})
      
      req.flash('message', 'Pensamento removido com sucesso.')
      req.flash('messageClass', 'success')
      
      req.session.save(() => {
        res.redirect('/toughts/dashboard') 
      })
    } catch(err) {
      console.log(err)   
    }
  }

  static async updateTought(req, res) {
    const { id } = req.params

    console.log(id)

    const tought = await Tought.findOne({where: { id: id }, raw: true})

    res.render('toughts/edit', { tought })
  }

  static async updateToughtSave(req, res) {
    const { title, id } = req.body

    const tought = { title }
    try {
      req.flash('message', 'Pensamento atualizado com sucesso.')
      req.flash('messageClass', 'success')

      await Tought.update(tought, { where: { id: id }})

      req.session.save(() => {
        res.redirect('/toughts/dashboard') 
      })
    } catch(err) {
      console.log(err)
    }
    
  }
}
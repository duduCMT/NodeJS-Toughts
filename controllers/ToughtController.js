const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
  static showToughts(req, res){
    res.render('toughts/home')
  }
  
  static async dashboard(req, res){
    res.render('toughts/dashboard')
  }

  static async createTought(req, res){
    res.render('toughts/create')
  }
}
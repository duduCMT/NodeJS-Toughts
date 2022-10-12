const { Sequelize } = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('MySQL conectado com sucesso')
} catch(err) {
  console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize
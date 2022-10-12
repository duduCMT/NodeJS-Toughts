const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('express-flash')
const FileStore = require('session-file-store')(session)
const conn = require('./db/conn')
const { port } = require('./config')

const app = express()

conn.sync()
  .then(() => {
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
  })
  .catch((err) => console.log(err))
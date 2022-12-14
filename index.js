const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('express-flash')
const FileStore = require('session-file-store')(session)

const { port } = require('./config')
const conn = require('./db/conn')
const models = require('./models')
const ToughtController = require('./controllers/ToughtController')
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

// Session Middleware
app.use(session({
  name: 'session',
  secret: 'duducmt_secret',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: () => {},
    path: require('path').join(require('os').tmpdir(), 'sessions'),
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true,
  }
}))

// Flash Messages
app.use(flash())

// Salvar a session da requisição (req) na resposta (res)
app.use((req, res, next) => {
  if(req.session.userid) {
    res.locals.session = req.session
  }
  next()
})

app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)
app.use('/', ToughtController.showToughts)

conn.sync({ force: false })
  .then(() => {
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
  })
  .catch((err) => console.log(err))
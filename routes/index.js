const express = require('express')
const app = express()

const toughtsRoutes = require('./toughtsRoutes')

app.use('/toughts', toughtsRoutes)
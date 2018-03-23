const path = require('path')

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const morgan = require('morgan');
const config = require('../config')
const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

require('./authentication').init(app)

app.use(session({
  store: new RedisStore({
    host: config.redisStore.host
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/"
  }
}))

app.use(function (req, res, next) {
  if (!req.session) {
    console.log("No session")
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
})

app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

require('./user').init(app)

module.exports = app

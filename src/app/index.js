import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
const bodyParser = require('body-parser')
const passport = require('passport')
const auth = require("./authentication/jwt.js")();
const jwt = require("jwt-simple");
const UserModel = require('./models/user')
const db = new UserModel()
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
app.use(auth.initialize());

app.use(session({
  store: new RedisStore({
    host: config.redisStore.host
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    domain: ".callisto.com"
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

app.get("/user", auth.authenticate(), function(req, res) {
  res.json(db.getUserById(req.user.id));
});

app.post("/token", function(req, res) {
  console.log("Post token:", req.body)
  if (req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Verifying user :", username, password)
    db.verifyUser(username, password, user => {
      if (user) {
        const payload = {
          id: user.id
        };
        const token = jwt.encode(payload, config.jwt.jwtSecret);
        res.json({
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
});


app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

require('./user').init(app)

module.exports = app

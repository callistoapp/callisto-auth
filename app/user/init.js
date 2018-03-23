const passport = require('passport')
const mysql = require('mysql');
const config = require('../../config');
const randomstring = require("randomstring");
const bcrypt = require('bcrypt')

function generatePassword() {
 //Generate Password
  const saltRounds = 10
  const plaintextPassword = randomstring.generate(32)
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(plaintextPassword, salt)
}

class UserDb {
  constructor() {
    this.con = mysql.createConnection({
      host: "mysql",
      user: "root",
      password: config.mysql.password,
      database: 'auth'
    })
  }

  getUser(username, cb) {
    const query = `SELECT * FROM users WHERE username="${username}"`
    this.con.query(query, (err,rows) => {
      if(err) cb(err, null);

      const result = JSON.parse(JSON.stringify(rows));

      cb(null, result[0])
    });
  }

  createUser(username, cb) {
    const password = generatePassword();
    const query = `INSERT INTO users (username, password) VALUES ("${username}", "${password}")`
    console.log(query);
    this.con.query(query, (err,rows) => {
      if(err) cb(err, null);
      const result = JSON.parse(JSON.stringify(rows));
      getUser(username, cb)
    });
  }
}

const checkAuthorizations = () => {
  return true
}


function initUser (app) {
  app.get('/sign-in', renderRegister)
  app.get('/', renderLogin)
  app.get('/check', passport.authenticationMiddleware(), checkAuthorizations)
  app.get('/profile', passport.authenticationMiddleware(), renderProfile)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
  app.post('/register', passport.authenticate('localRegister', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
}

function renderRegister (req, res) {
  res.render('user/register')
}

function renderLogin (req, res) {
  res.render('user/login')
}

function renderProfile (req, res) {
  res.render('user/profile', {
    username: req.user.username
  })
}

module.exports = {initUser, UserDb}

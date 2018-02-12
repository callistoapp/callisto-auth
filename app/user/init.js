const passport = require('passport')
const mysql = require('mysql');
const config = require('../../config');

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
    console.log(query)
    this.con.query(query, (err,rows) => {
      if(err) cb(err, null);

      const result = JSON.parse(JSON.stringify(rows));

      cb(null, result[0])
    });
  }

}


function initUser (app) {
  app.get('/', renderWelcome)
  app.get('/profile', passport.authenticationMiddleware(), renderProfile)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
}

function renderWelcome (req, res) {
  res.render('user/welcome')
}

function renderProfile (req, res) {
  res.render('user/profile', {
    username: req.user.username
  })
}

module.exports = {initUser, UserDb}

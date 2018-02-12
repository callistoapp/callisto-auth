const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const UserDb = require('../user').UserDb
const authenticationMiddleware = require('./middleware')

// Generate Password
// const saltRounds = 10
// const myPlaintextPassword = 'my-password'
// const salt = bcrypt.genSaltSync(saltRounds)
// const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

// const user = {
//   username: 'test-user',
//   passwordHash,
//   id: 1
// }

const db = new UserDb()


passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  db.getUser(username, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      db.getUser(username, (err, user) => {
        if (err) {
          return done(err)
        }

        // User not found
        if (!user) {
          return done(null, false)
        }

        // Always use hashed passwords and fixed time comparison
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport

const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const RegisterStrategy = require('passport-local-register').Strategy
const UserDb = require('../user').UserDb
const authenticationMiddleware = require('./middleware')

const db = new UserDb()

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  db.getUser(username, cb)
})

function initPassport () {
  passport.use(new RegisterStrategy(
    (username, password, done) => {
      db.getUser(username, (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done() // see section below
        }
        // if (!user.verifyPassword(password)) {
        //   return done(null, false)
        // }
        done(null, user)
      });
    }, (username, password, done) => {
      db.createUser(username, (err, user) => {
        if(err) {
          return done(err)
        }
        // if(!user) {
        //   err = new Error("User creation failed.")
        //   return done(err)
        // }
        done(null, user)
      });
    }
  ))

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

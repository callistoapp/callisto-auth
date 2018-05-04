import Strategy from 'passport-local'

import UserModel from '../models/user'
const Users = new UserModel()

const LocalLoginStrategy = new Strategy({
    emailField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  }, (req, username, password, done) => {

  process.nextTick(() => {
    Users.verifyUser({username, password}, (err, user) => {
      if (err)
        return done(err)
      else
        return done(null, user)
    })
  })
})

const LocalRegisterStrategy = new Strategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  }, (req, email, password, done) => {

  if (email)
    email = email.toLowerCase() // Use lower-case e-mails to avoid case-sensitive e-mail matching

  process.nextTick(() => {
    // if the user is not already logged in:
    if (!req.user) {
      Users.createUser({email: req.body.email, password, username: req.body.username}, (err, user) => {
        if (err)
          return done(err)
        return done(null, user)
      })
    } else if (!req.user.local.email) {
      Users.getUser({email}, (err, existingUser) => {
        if (err)
          return done(err)

        if (existingUser) {
          return done(null, false, req.flash('loginMessage', 'That email is already taken.'))
        } else {
          Users.createUser({email, password}, (err, user) => {
            if (err)
              return done(err)
            return done(null, user)
          })
        }
      })
    } else {
      // user is logged in and already has a local account.
      // Ignore signup. (You should log out before trying to create a new account, user!)
      return done(null, req.user);
    }
  })
})

export default {login: LocalLoginStrategy, register: LocalRegisterStrategy}

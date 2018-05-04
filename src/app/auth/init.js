import GoogleStrategy from './google'
import GithubStrategy from './github'
import LocalStrategy from './local'
import JwtStrategy from './jwt'
import passport from 'passport'

const initAuth = (app) => {
  app.use(passport.initialize())
  app.use(passport.session()) // persistent login sessions

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(GoogleStrategy)
  passport.use(GithubStrategy)
  passport.use('local-login', LocalStrategy.login)
  passport.use('local-register', LocalStrategy.register)
  passport.use(JwtStrategy)
}

export default initAuth

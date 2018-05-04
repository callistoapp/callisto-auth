import Router from 'express'
import passport from 'passport/lib/index'

const router = new Router()

// /login
router.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
)

// /register
router.post('/register',
  passport.authenticate('local-register', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
)

export default router

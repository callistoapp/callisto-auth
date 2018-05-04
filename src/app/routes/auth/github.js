import Router from 'express'
import passport from "passport/lib/index";

const router = new Router()

// /auth/github
router.get('/',
  passport.authenticate('github', {
    successRedirect: 'http://app.callisto.com',
    failureRedirect: '/login'
  })
)

// /auth/github/callback
router.get('/callback',
  passport.authenticate('github', {
    successRedirect: 'http://app.callisto.com',
    failureRedirect: '/login'
  })
)

export default router

import Router from 'express'
import passport from "passport/lib/index";

const router = new Router()

// /google
router.get('/',
  passport.authenticate('google', {
    successRedirect: 'http://app.callisto.com',
    failureRedirect: '/login'
  })
)

// /google/callback
router.get('/callback',
  passport.authenticate('google', {
    successRedirect: 'http://app.callisto.com',
    failureRedirect: '/login'
  })
)

export default router

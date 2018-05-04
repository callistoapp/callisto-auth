import Router from 'express'
import passport from "passport/lib/index";

const router = new Router()

// /auth/github
router.get('/',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
)

// /auth/github/callback
router.get('/callback',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
)

export default router

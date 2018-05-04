import Router from 'express'

const router = new Router()

// route middleware to ensure user is logged in
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next()

  res.redirect('/login')
}

// route middleware to ensure user is not logged in
export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated())
    return next()

  res.redirect('/profile')
}

router.get('/profile', isLoggedIn, (req, res) => {
  res.redirect('http://app.callisto.com')
})

router.get('/login/check', isLoggedIn, (req, res) => {
  res.send(200)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

export default router

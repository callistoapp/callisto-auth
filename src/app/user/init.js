const passport = require('passport')
const mysql = require('mysql');
const config = require('../../config');
const randomstring = require("randomstring");
const bcrypt = require('bcrypt')


const checkAuthorizations = () => {
  return true
}

function initUser (app) {
  app.get('/sign-in', renderRegister)
  app.get('/', renderLogin)
  app.get('/check', passport.authenticationMiddleware(), checkAuthorizations)
  app.get('/profile', passport.authenticationMiddleware(), renderProfile)
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
  app.post('/register', passport.authenticate('localRegister', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
}

function renderRegister (req, res) {
  res.render('user/register')
}

function renderLogin (req, res) {
  res.render('user/login')
}

function renderProfile (req, res) {
  res.render('user/profile', {
    username: req.user.username
  })
}

module.exports = initUser

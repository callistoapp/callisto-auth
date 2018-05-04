// Static files
import Router from 'express'
import path from 'path'
import {isNotLoggedIn} from './index'

const router = new Router()


router.get("/login", isNotLoggedIn, function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../public', 'login.html'))
})

router.get("/register", isNotLoggedIn, function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../public', 'register.html'))
})

router.get("/css/main.css", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../../public/css', 'main.css'))
})

router.get('/', (req, res) => {
  res.redirect('/login')
})

export default router

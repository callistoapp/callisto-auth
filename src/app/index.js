import path from 'path'
import express from 'express'
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import jwt from 'jwt-simple'

import initJwt from './auth/jwt'
import UserModel from './models/user'
import {jwtConfig} from '../config/index'
import * as _ from "lodash";

const app = express()
const db  = new UserModel()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: false
}))

const {initialize, authenticate} = initJwt()

app.use(initialize())

app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname      : '.hbs',
  layoutsDir   : path.join(__dirname),
  partialsDir  : path.join(__dirname)
}))

app.post("/login", function (req, res) {
  if (req.body.username && req.body.password) {
    const username = req.body.username
    const password = req.body.password
    db.verifyUser(username, password, (err, user) => {
      console.log(user, err)
      if (err === null && !_.isNil(user)) {
        const payload = {
          id: user.id
        }
        const token   = jwt.encode(payload, jwtConfig.jwtSecret)
        res.json({
          token: token
        })
      } else {
        res.sendStatus(401)
      }
    })
  } else {
    res.sendStatus(401)
  }
})

app.post("/register", function (req, res) {
  if (req.body.username && req.body.email && req.body.password) {
    const {username, email, password} = req.body
    db.createUser({username, password, email}, (err, user) => {
      if (err === null && !_.isNil(user)) {
        const payload = {
          id: user.id
        }
        const token   = jwt.encode(payload, jwtConfig.jwtSecret)
        res.json({
          token: token
        })
      } else {
        res.sendStatus(401)
      }
    })
  } else {
    res.sendStatus(401)
  }
})

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

app.get("/check", authenticate('jwt', {session: false}), function (req, res) {
  res.json("Success! Youre connected")
})

app.get("/", (req, res) => {
  res.json("Welcome to callisto auth")
})

export default app

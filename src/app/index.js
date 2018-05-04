import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import initAuth from './auth/init'
import GithubRoutes from './routes/auth/github'
import GoogleRoutes from './routes/auth/google'
import JwtRoutes from './routes/auth/jwt'
import LocalRoutes from './routes/auth/local'
import StaticRoutes from './routes/static'
import MainRoutes from './routes/index'
import session from 'express-session'
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(session({
  secret: 'ilovescotchscotchyscotchscotch', // session secret
  resave: true,
  saveUninitialized: true,
  cookie: {
    domain: ".callisto.com",
    name: "callisto_session"
  }
}))

initAuth(app)

app.use('/github', GithubRoutes)
app.use('/google', GoogleRoutes)
app.use('/jwt', JwtRoutes)
app.use(LocalRoutes)
app.use(StaticRoutes)
app.use(MainRoutes)

export default app

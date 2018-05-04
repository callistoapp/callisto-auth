import Router from 'express'
import passport from "passport/lib/index";

const router = new Router()

// /auth/jwt
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.sendStatus(200)
  // if (req.body.username && req.body.email && req.body.password) {
  //   const {username, email, password} = req.body
  //   db.createUser({username, password, email}, (err, user) => {
  //     if (err === null && !_.isNil(user)) {
  //       const payload = {
  //         id: user.id
  //       }
  //       const token   = jwt.encode(payload, jwtConfig.jwtSecret)
  //       res.json({
  //         token: token
  //       })
  //     } else {
  //       res.sendStatus(401)
  //     }
  //   })
  // } else if (req.body.username && req.body.password) {
  //   const {username, password} = req.body
  //   db.verifyUser({username, password}, (err, user) => {
  //     if (err === null && !_.isNil(user)) {
  //       const payload = {
  //         id: user.id
  //       }
  //       const token   = jwt.encode(payload, jwtConfig.jwtSecret)
  //       res.json({
  //         token: token
  //       })
  //     } else {
  //       res.sendStatus(401)
  //     }
  //   })
  // } else {
  //   res.sendStatus(401)
  // }
})

export default router

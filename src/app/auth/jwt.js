import passport from 'passport'
import passportJWT from 'passport-jwt'
import * as _ from 'lodash'

import UserModel from '../models/user'
import {jwtConfig} from '../../config/index'

const ExtractJwt = passportJWT.ExtractJwt
const Strategy   = passportJWT.Strategy

const params = {
  secretOrKey   : jwtConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const users = new UserModel()

const init = () => {
  const strategy = new Strategy(params, function (payload, done) {
    users.getUserById(payload.id, (err, user) => {
      if (err === null && !_.isNil(user)) {
        return done(null, {
          id: user.id
        })
      } else {
        return done("User not found", null)
      }
    })
  })
  passport.use(strategy)
  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return passport.authenticate("jwt", jwtConfig.jwtSession)
    }
  }
}

export default init

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

const Users = new UserModel()

const JwtStrategy = new Strategy(params, function (payload, done) {
  Users.getUser({id: payload.id}, (err, user) => {
    if (err === null && !_.isNil(user)) {
      return done(null, {
        id: user.id
      })
    } else {
      return done("User not found", null)
    }
  })
})

export default JwtStrategy

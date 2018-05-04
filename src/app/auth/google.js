import Strategy from 'passport-google-oauth20'
import UserModel from '../models/user'
import {googleConfig} from '../../config'
import * as _ from 'lodash'
const Users = new UserModel()

const params = {
  clientID    : googleConfig.CLIENT_ID,
  clientSecret: googleConfig.CLIENT_SECRET,
  callbackURL : "https://auth.callisto.com/google/callback",
  scope: ['profile', 'email']
}

const GoogleStrategy = new Strategy(params, (accessToken, refreshToken, profile, done) => {
  Users.findOrCreate({googleId: profile.id, email: _.get(profile, 'emails[0].value')}, function (err, user) {
    return done(err, user)
  })
})

export default GoogleStrategy

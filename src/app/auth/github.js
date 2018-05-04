import Strategy from 'passport-github'
import UserModel from '../models/user'
import {githubConfig} from '../../config'

const Users = new UserModel()

const params = {
  clientID    : githubConfig.CLIENT_ID,
  clientSecret: githubConfig.CLIENT_SECRET,
  callbackURL : "http://auth.callisto.com/github/callback"
}

const GithubStrategy = new Strategy(params, (accessToken, refreshToken, profile, done) => {
  Users.findOrCreate({githubId: profile.id}, function (err, user) {
    return done(err, user)
  })
})

export default GithubStrategy

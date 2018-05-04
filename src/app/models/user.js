import bcrypt from 'bcrypt'
import mysql from '../db/index'
import * as _ from "lodash";

class User {
  constructor() {
    this.getUser       = this.getUser.bind(this)
    this.verifyUser    = this.verifyUser.bind(this)
    this.createUser    = this.createUser.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.hashPassword  = this.hashPassword.bind(this)
  }

  findOrCreate(identity, cb) {
    this.getUser(identity, (err, user) => {
      if (err !== null) {
        cb(err, null)
        return
      }

      if (!_.isNil(user)) {
        cb(null, user)
      } else {
        this.createUser(identity, cb)
      }
    })
  }

  getUser(identity, cb) {
    const where = _.map(identity, (k, u) => {
      return `${u}='${k}'`
    }).join(' OR ')

    const query = `SELECT * FROM users WHERE ${where}`
    mysql.query(query, (err, rows) => {
      if (err) cb(err, null)
      const result = JSON.parse(JSON.stringify(rows))
      cb(null, result[0])
    })
  }

  verifyUser(user, cb) {
    this.getUser(_.omit(user, 'password'), (err, u) => {
      if (err || _.isNil(u)) {
        cb(err, null)
        return
      }
      this.checkPassword(u.password, user.password, valid => {
        if (valid)
          cb(null, u)
        else
          cb(new Error("Unauthorized"), null)
      })
    })
  }

  createUser(user, cb) {
    if (user.hasOwnProperty('password'))
      user.password = this.hashPassword(user.password)
    const keys = _.keys(user).join()
    const values = _.map(_.values(user), u => `"${u}"`).join()
    const query = `INSERT INTO users (${keys}) VALUES (${values})`
    mysql.query(query, err => {
      if (err) cb(err, null)
      else this.getUser({username: user.username}, cb)
    })
  }

  checkPassword(stored, entered, cb) {
    bcrypt.compare(entered, stored, (err, isValid) => {
      if (err) {
        cb(false)
      }
      cb(isValid)
    })
  }

  hashPassword(password) {
    const saltRounds = 10
    const salt       = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
  }
}

module.exports = User

import bcrypt from 'bcrypt'
import mysql from '../db/index'
import randomstring from 'randomstring'

class User {
  constructor() {
    this.getUser       = this.getUser.bind(this)
    this.verifyUser    = this.verifyUser.bind(this)
    this.getUserById   = this.getUserById.bind(this)
    this.createUser    = this.createUser.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.hashPassword  = this.hashPassword.bind(this)
  }

  getUser(login, cb) {
    const query = `SELECT * FROM users WHERE username="${login}" OR email="${login}"`
    mysql.query(query, (err, rows) => {
      if (err) cb(err, null)

      const result = JSON.parse(JSON.stringify(rows))

      cb(null, result[0])
    })
  }

  verifyUser(username, password, cb) {
    const query = `SELECT * FROM users WHERE username="${username}"`
    mysql.query(query, (err, rows) => {
      if (err) {
        cb(err, false)
        return
      }

      const result = JSON.parse(JSON.stringify(rows))
      this.checkPassword(result[0].password, password, valid => {
        if (valid)
          cb(null, result[0])
        else
          cb(new Error("Unauthorized"), null)
      })
    })
  }

  getUserById(id, cb) {
    console.log('Getting user at id : ', id)
    const query = `SELECT * FROM users WHERE id="${id}"`
    mysql.query(query, (err, rows) => {
      if (err) cb(err, null)
      else {
        const result = JSON.parse(JSON.stringify(rows))
        cb(null, result[0])
      }
    })
  }

  createUser(user, cb) {
    const pass  = this.hashPassword(user.password)
    const query = `INSERT INTO users (username, password, email) VALUES ("${user.username}", "${pass}", "${user.email}")`
    mysql.query(query, err => {
      if (err) cb(err, null)
      else this.getUser(user.username, cb)
    })
  }

  checkPassword(stored, entered, cb) {
    console.log('verifying pass', stored, entered)
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

const bcrypt = require("bcrypt");
const mysql = require("../db/index");
const randomstring = require("randomstring");

class User {
  constructor() {
    this.getUser = this.getUser.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
  }

  getUser(username, cb) {
    const query = `SELECT * FROM users WHERE username="${username}"`
    mysql.query(query, (err,rows) => {
      if(err) cb(err, null);

      const result = JSON.parse(JSON.stringify(rows));

      cb(null, result[0])
    });
  }

  verifyUser(username, password, cb) {
    const query = `SELECT * FROM users WHERE username="${username}"`
    mysql.query(query, (err,rows) => {
      if(err) cb(err, false);

      const result = JSON.parse(JSON.stringify(rows));

      if (this.checkPassword(result[0].password, password))
        cb(null, result[0])
      cb(new Error("Unauthorized"), null)
    });
  }

  getUserById(id, cb) {
    const query = `SELECT * FROM users WHERE id="${id}"`
    mysql.query(query, (err,rows) => {
      if(err) cb(err, null);
      const result = JSON.parse(JSON.stringify(rows));
      cb(null, result[0])
    });
  }

  createUser(username, cb) {
    const password = this.generatePassword();
    const query = `INSERT INTO users (username, password) VALUES ("${username}", "${password}")`
    console.log(query);
    mysql.query(query, (err, rows) => {
      if(err) cb(err, null);
      this.getUser(username, cb)
    });
  }

  checkPassword(stored, entered) {
    bcrypt.compare(entered, stored, (err, isValid) => {
      if (err) {
        console.log(err)
        return false
      }
      return isValid
    })
  }

  generatePassword() {
    const saltRounds = 10
    const plaintextPassword = randomstring.generate(32)
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(plaintextPassword, salt)
  }
}

module.exports = User;

const config = {}

config.redisStore = {
  host: process.env.REDIS_STORE_HOST,
  secret: process.env.REDIS_STORE_SECRET
}

config.mysql = {
  password: process.env.MYSQL_ROOT_PASSWORD
}

module.exports = config

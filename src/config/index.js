export const redisConfig = {
  host: process.env.REDIS_STORE_HOST,
  secret: process.env.REDIS_STORE_SECRET
}

export const mysqlConfig = {
  password: process.env.MYSQL_ROOT_PASSWORD
}

export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {
    session: false
  }
}

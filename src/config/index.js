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

export const githubConfig = {
  CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
}

export const googleConfig = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}

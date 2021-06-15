// 存储的配置？
const env = process.env.NODE_ENV     // 环境变量  process是nodejs的进程的一些信息

// 配置
let MYSQL_CONF

// env应该是会随着环境而不断发生变化的~
if (env === 'env') {
  // 这是开发环境下的操作~
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  // 线上情况  下面的配置视情况而定
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}
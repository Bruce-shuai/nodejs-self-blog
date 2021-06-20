const env = process.env.NODE_ENV; // 环境参数
// 因为在不同环境下，所连接的数据库可能是不一样的(例如线上线下所连接的数据库就不会是一样的)

// 配置
let MYSQL_CONF;   // 这是一个对象

// 开发环境下所要连接的数据库
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
}

// 上线后所连接的数据库
if (env === 'production') {
  // 由于本次项目没有服务器，所以只好弄成上面的dev环境连的数据库
  // 实际项目中要连接服务器，其实流程都是一样的
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
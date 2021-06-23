const { exec } = require('../db/mysql');

// 这里的post请求竟然也用的是select语句


// select语句中 关键字password 不需要加上 ``
// 通过用户、密码登录来获取对应的用户信息和权限
const loginCheck = (username, password) => {
  const sql = `select username, realname from users where username='${username}' and password='${password}'`

  return exec(sql).then(rows => {   // 只取数组中的第一个元素(对象)
    return rows[0] || {}   // 这里的用法其实也还可以
  })
}

module.exports = {
  loginCheck
}
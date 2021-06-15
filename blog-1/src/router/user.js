const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method;   // GET POST

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;  // 用户名和密码竟然是放在req.body里面的
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {  // 如果没有数据则是undefined
        // 操作cookie
        res.setHeader('Set-Cookie', `username=${data.username}`)
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return new SuccessModel();
    }
    return new ErrorModel('尚未登录')
  }
}

module.exports = handleUserRouter;
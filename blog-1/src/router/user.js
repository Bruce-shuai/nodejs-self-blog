const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method;   // GET POST

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;  // 用户名和密码竟然是放在req.body里面的
    const result = loginCheck(username, password)
    if (result) {
      return new SuccessModel();
    }
    return new ErrorModel('登录失败')
  }
}

module.exports = handleUserRouter;
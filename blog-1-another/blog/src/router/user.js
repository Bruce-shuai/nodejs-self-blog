const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 一个关于user的接口 这里的函数要接受req, res这两个参数好对应app.js文件的内容
const handleUserRouter = (req, res) => {
  const method = req.method;  // GET POST


  // 登录接口
  if (method === 'POST' && req.path === '/api/user/login') {
    // 用户名和密码都是通过post Data 传递过来的,而postData 全放在了req.body
    const { username, password } = req.body;
    const result = loginCheck(username, password);
    if (result) {
      return new SuccessModel(result);
    }
    return new ErrorModel('用户登录失败')
  }
}

module.exports = handleUserRouter;
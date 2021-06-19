// 一个关于user的接口 这里的函数要接受req, res这两个参数好对应app.js文件的内容
const handleUserRouter = (req, res) => {
  const method = req.method;  // GET POST


  // 登录接口
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '这是登录的接口'
    }
  }
}

module.exports = handleUserRouter;
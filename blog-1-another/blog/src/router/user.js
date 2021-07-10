const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();  // GMT格式
}

// 一个关于user的接口 这里的函数要接受req, res这两个参数好对应app.js文件的内容
const handleUserRouter = (req, res) => {
  const method = req.method;  // GET POST


  // 登录接口   登录用post请求，post请求更加安全一点并且能够防止一些跨域问题（这是啥呢？）
  if (method === 'GET' && req.path === '/api/user/login') {
    // 用户名和密码都是通过post Data 传递过来的,而postData 全放在了req.body
    // const { username, password } = req.body;
    const {username, password} = req.query;
    const result = login(username, password);
    return result.then(data => {    // 这里的参数命名可不要是res 不然和外面函数的res重名就危险了
      if (data.username) {
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // server端操作cookie  下面这个res.setHeader操作方法可是真的厉害哟
       
        return new SuccessModel(data);
      }
      return new ErrorModel('用户登录失败')
    })
  }


  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {   // 如果cookie里有username就说明已经登录
      // 这里临时用Promise.resolve 用来返回promise实例的方法很巧妙啊
      return Promise.resolve(new SuccessModel());
    } 
    return Promise.resolve(new ErrorModel('尚未登录'));
  } 
}

module.exports = handleUserRouter;
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');


const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query    
  req.query = querystring.parse(url.split('?')[0])

  // 处理blog路由
  const blogData = handleBlogRouter(req, res); 
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return;    // 为了避免继续往下执行
  }

  // 处理user路由
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(
      JSON.stringify(blogData)
    )
    return;
  }

  // 为命中路由，返回404    这个“命中” 二字说得很专业啊~
  // text/plain  指的纯文本
  res.writeHead(404, {"Content-type": "text/plain"})
  res.write("404 Not Found\n")  // 其实这里前端路由应该也是可以解决的
  res.end();

}

module.exports = serverHandle;
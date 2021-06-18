// 业务代码
// 获取Blog、User的Router
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {

  // 设置返回格式 为 JSON
  res.setHeader('Content-type', 'application/json');

  // 开始处理 Router 的内容
  // 处理 blog 路由
  const blogData = handleBlogRouter(req, res);
  if (blogData) {  // 如果输入的是正确的值
    res.end(
      JSON.stringify(blogData)
    )
    return;        // 防止继续往下执行 
  }
  
  // 处理 user 路由
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return;
  }

  // 如果上面两个路由都没有被命中，则返回404
  // 那这里前端该有什么操作呢？   text/plain 纯文本
  res.writeHead(404, {"Content-type": "text/plain"})
  res.write("404 Not Found\n");
  res.end();      // 就什么也不用写了
}

module.exports = serverHandle;
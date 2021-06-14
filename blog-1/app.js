const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');


// 用于处理  post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      resolve({})   // 如果是GET请求，就不存在post data的问题
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return;
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {  // 没有任何数据的时候
        resolve({})
        return;
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise;
}


const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query    
  req.query = querystring.parse(url.split('?')[1])

  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData;    // req.body 是用来干什么的，处于header之中吗？

    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      return;
    }

    // 处理 user 路由
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
  })

}

module.exports = serverHandle;
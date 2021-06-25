// 业务代码
// 获取Blog、User的Router
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');


// 用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});       // 如果是GET请求就不存在post data 这种问题  
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});       // 如果请求过来的数据不是json格式的 就不进行server端获取数据
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      if (!postData) {  // 如果没有数据
        resolve({})
        return;
      }
      resolve(
        JSON.parse(postData)   // 为什么这里用的是 JSON.parse,但这种用法会让postData变成对象
      )
    })
  })
  return promise;
}


const serverHandle = (req, res) => {

  const url = req.url;
  const path = url.split('?')[0];
  req.path = path
  // 设置返回格式 为 JSON
  res.setHeader('Content-type', 'application/json');

  // 解析 query 以方便 GET 接口返回对应的数据
  req.query = querystring.parse(url.split('?')[1]);

  /* 解析cookie 这里面的代码用得好啊*/
  // 注意，cookie的内容最好不要在前端改，而应该在后端进行修改
  req.cookie = {};   // 为req开辟一个cookie属性 并设置为对象
  // 先获取cookie
  const cookieStr = req.headers.cookie || ''; // k1=v1; k2=v2; k3=v3
  cookieStr.split(';').forEach(item => {      // 先将字符串拆分成数组 
    if (!item) {   // 如果为空就返回
      return;
    }
    const arr = item.split('=');
    const key = arr[0];
    const value = arr[0];
    req.cookie[key] = value;   // 这一招秀啊
  })  
// console.log('cookie is ', req.cookie);
  // 登录验证：  前端把cookie 传到后端，由后端来解析cookie，
  // 我们来做个规定：如果cookie中有username,就认为已经登录，如果cookie中没有username，就认为没有登录

  // 先解析下是否有post Data的数据
  getPostData(req).then(postData => {
    req.body = postData;   // 把postData的值放在req.body里面
    
    // 注意一下，这里解析post Data和处理路由的代码执行顺序

    // 开始处理 Router 的内容
    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
          res.end(
            JSON.stringify(blogData)
          )
      })
      return;
    }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return;
    }

    // 如果上面两个路由都没有被命中，则返回404
    // 那这里前端该有什么操作呢？   text/plain 纯文本
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n");
    res.end();      // 就什么也不用写了
  })
}

module.exports = serverHandle;
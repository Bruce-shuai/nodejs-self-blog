const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

// session 数据(全局变量)
const SESSION_DATA


// 用于处理  get post 的数据
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})   // 如果是GET请求，就不存在post data的问题
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return;
    }
    let postData = '';
    // chunk 这个数据是怎么来的呢？
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
  req.path = url.split('?')[0];    // 这里似乎就是在暗示，url最多也就一个？

  // 解析query    
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''; // 直接从request.headers里获取cookie
  // 这里用得是真的好 搭配上forEach  forEach的用法用空可以研究研究
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0];
    const val = arr[1];
    req.cookie[key] = val;    // 这里用得也是真的好！！
  })
  console.log('req.cookie is', req.cookie);

  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData;    // req.body 是用来干什么的，处于header之中吗？

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
          res.end(
            JSON.stringify(blogData)
          )
      })
      return;
    }
    // 处理 user 路由
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return;
    // }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
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
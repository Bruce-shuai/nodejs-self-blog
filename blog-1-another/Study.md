### 开发接口(不用任何框架)

- nodejs 处理 http 请求
- 搭建开发环境(由于没框架，只能自己搭建)
- 开发接口(先不连接数据库也不考虑登录问题)

#### http 请求概述

- DNS 解析，建立 TCP 连接，发送 http 请求
- server 接收到 http 请求，处理，并返回 (server 端所做的事情，也是本节所需要做的内容)
- 客户端接收到返回数据，处理数据(如页面渲染，执行 js)

```
我们输入的域名会对应一个服务器地址(ip地址)  可在控制台 netWork/Remote Address里看见
443 是 https的默认端口
80 是 http的默认端口

DNS解析： 通过域名解析到ip地址
```

#### nodejs(作为 server 端) 处理 http 请求

- get 请求 和 querystring
- post 请求 和 postdata
- 路由(其实是接口地址)

下面给出 nodejs 处理 http 请求 最简单的实例

```
const http = require('http');
// req 是浏览器发送到服务器的内容
// res 是服务器发送到浏览器的内容
const server = http.createServer((req, res) => {
  res.end('hello world');   // 表示response结束
})
server.listen(8000);
```

##### nodejs 处理 get 请求

- get 请求，即客户端要向 server 端获取数据，如查询博客列表 (是 server 端传数据到客户端)
- 通过 querystring(即 url 参数)来传递数据，如 a.html?a=100&b=200
- 浏览器直接访问，就发送 get 请求

nodejs 处理 get 请求 例子：

```
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log(req.method);    // GET
  const url = req.url;        // 获取请求的完整url
  req.query = querystring.parse(url.split('?')[1]) // 解析 querystring，parse方法将参数转为对象(键值对格式保存)，并放进req.query 里面
  res.end(JSON.stringify(req.query)); // 将querystring 返回, response也随之结束
})
server.listen(8000);
```

实战：

```
npm init -y

写代码...
运行代码： node + 文件名(这个文件名需要和package.json main属性的对应文件名的名字一致)
```

##### nodejs 处理 post 请求

- post 请求，即客户端要像服务端传递数据，如新建博客(客户端要向 server 端传一些数据)
- 通过 post data 传递数据(post data 可不是什么专业的术语，只是传递的信息)
- 浏览器无法直接模拟，需要手写 js(ajax~还有跨域同域问题)，或者使用 postman(这个好评！)

nodejs 处理 post 请求 实例：

```
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // 数据格式 --- content-type: 发送的格式是什么？
    console.log('content-type', req.headers['content-type'])
    // 接受数据  数据流方式传输(从客户端传到服务端)
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    // end 表示从客户端传来的数据已经流完了~  这里和点击事件的道理差不多
    req.on('end', () => {
      console.log(postData)
      // 这里表示server端也处理完毕，end结束了，()里的内容返回到浏览器
      res.end('hello world')  // 在这里返回，因为这里是异步
    })
  }
})
```

注意： 更新了代码的内容，需重新启动 node。 node + 需要启动的文件名

##### nodejs 处理路由

- https://github.com/ // /是一个路由，叫"点击路由"
- https://github.com/username
  // /username 也是一个路由
- https://github.com/username/xxx
  // /username/xxx 又是一个路由

  路由代表了 url 唯一的标识

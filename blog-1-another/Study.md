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

  有个问题： 何谓 url？ url 似乎没有包含 协议、域名、端口号

##### 处理 http 请求的综合案例

##### 关于 github 提交内容，我有一个问题

在一个大的文件夹里，我开辟了一个 git 仓库并放到了 github 这个远程仓库了。如果我哪天一不小心，把这个大文件里的小文件以单独的 git 一系列操作又单独开辟了一个 git 仓库。这种情况可能存在吗？

> 刚才测试，似乎不会~ 本质上还是在原来那个大的 git 仓库里记录了这个小文件的更改

##### 开始项目搭建了(不适用任何框架)~

- 从 0 开始搭建，不使用任何框架
- 使用 nodemon 监测文件变化，自动重启 node
- 使用 cross-env 设置环境变量，兼容 mac linux 和 windows

1. 首先确保开发的时候有 node 环境，且注意 node 版本号 >= 8.0 `node -v`
2. `npm init -y` 来初始化 npm 的环境(会生成一个 package.json 文件)
3. 把 package.json 文件的 main 属性的 index.js 改为 主执行文件名(及其路径)  
   创建一个 bin 文件夹(相当于其他语言的可执行文件)把初次执行的文件放在这个 bin 目录下
   故 package.json 文件里的"main": "bin/www.js"
4. bin/www.js 这个文件主要是用来写 server 的构建逻辑的

```
const http = require('http');

const PORT = 8000;

const server = http.createServer(...) // 这里的内容又再弄一个文件来实现~
server.listen(PORT)

createServer()里的回调函数，我放在app.js 文件来写

运行代码(blog文件夹下)： node bin/www.js
```

5. 安装 nodemon 和 cross-env

```
npm install nodemon cross-env --save-dev
```

然后在 package.json 文件 的 script 属性里，增添下面的内容

> "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"

```
nodemon效果: 监控文件变化，自动重启node
cross-env NODE_ENV  是兼容环境变量  这样可以兼容windows和mac、linux的操作系统环境

这样之后，通过npm run dev 就可以启动这个环境变量, 从而代替 node + 文件名的使用方法。这个和我在看dell视频的webpack中是有讲这个的~

挺好用的~
我们可以直接通过 process.env.NODE_ENV 来获得当前启动这个项目用的是什么环境(比如线上prod，开发dev)

更多内容有待进一步学习~
```

#### 开发路由

##### 初始化路由

> 开发接口

- 初始化路由: 根据之前技术方案的设计，做出路由
- 返回假数据: 将路由和数据处理分离，以符合设计原则

```
接口设计：
(这个很重要啊，以后前端看后端给的东西，这些就很重要！)
接口的描述：....
一般的接口命名: /api/blog/list ....
方法: 比如 get、post
参数: 比如author作者, keyword搜索关键字
备注: ...
```

1. 开始操作~ 首先，www.js 这个文件就别动了，而对 app.js 这个业务逻辑的文件有一定的操作~
   (注意： 业界有一个规范是 后端返回给前端的数据是 json 格式的，这样前端才好解析数据)

2. 在根文件的基础上创建一个 src 文件夹，将所有的逻辑代码文件都放进这里。

3. 在 src 文件夹下放一个 router 文件夹。并分别建立两个文件 blog.js user.js 这两个文件分别承载项目的接口的实现
4. 注意，测试 post 接口要用 postman 来解决

##### 开发博客列表路由

1. 建一个数据模型

```
专门在src文件夹下再创建一个文件夹 名字叫做Model。  用来规范 response 数据返回的格式
```

2. 再在 src 文件夹下创建一个 controller 文件夹。 (
   这个文件夹里存放的文件用于 存放返回给浏览器的数据。比如说 get 请求，我把 url 的参数传进来，返回对应的值
   )

   controller 文件夹 是更关心数据层面的东西的

3. 注意一个问题:

```
在POST请求，server端的下面操作

let postData = '';
req.on('data', chunk => {
  postData += chunk.toString();
})
req.on('end', () => {
  resData.postData = postData;
  res.end(
    JSON.stringify(resData);
  )
})

上面的代码其实是一个异步代码
所以用Promise 来实现更好(拒接回调地狱)
```

##### 新建和更新路由

注意：

- get 接口 和 query 息息相关
- post 接口 和 post Data 的数据息息相关

##### 路由 和 API

- 这两者不是太好区分

API：在前端和后端、不同端(子系统)之间对接的一个术语

url(路由) , 输入(url 的参数,如 keyword), 输出(例如输出 JSON 格式的数据)

路由：
API 的一部分
后端系统内部的一个定义

#### MySql 介绍

##### 连接数据库

- nodejs 连接 mysql
- API 连接 mysql

项目任务： 先用 MySql 再用 Mongodb
本课程只讲基本使用

二八原则

##### mysql 介绍

- web server 中最流行的关系型数据库
- 轻量级,易学易用(二八原则)
- 安装 workbench
  - 操作 mysql 的客户端，可视化操作(官网自己开发的)

##### workbench

```
点击 左上角 SQL+ 进入代码执行页面
雷电标志    运行代码(可运行任意想代码)
```

语法：
注意 SQL 语法结尾别忘写 ;

- show databases; 展示所有的数据库

操作数据库:

- 建库
  - 有一个小图标 +柱体
  - 删库
    - 数据库，右键，drop schema，确认
    - 当然也可以直接执行 sql 语句：
      drop database db_name;
- 建表

  - 建表的时候，id 是数据的标识
  - 所谓建表，建的是表结构
    - column 表示所创建的表有多少列，显示列表名
    - datatype 这一列的数据类型(注意：longtext 这种数据类型能够存储 4G 的数据)
    - pk 主键 保证所有行的值都不能重复(常用 id 做主键)
    - nn 不为空 表示这一列的内容是否能为空
    - AI 自动增加 这种自动增加，可以保证所有行的值不重复(id)
    - Default (不用管)
  - 建表方法(使用图形化的界面)
    - 在所创建的数据库里面，右击 Tables, 点击 Create Table..
    - 然后填写一些数据,点击右下角的`apply`
  - 修改表 右击表 点击 Alter Table...
  - 删除表 右击表 点击 Drop Table...

- 表操作(通过 sql 语句 来操作)
  数据库的增删改查操作

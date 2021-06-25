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
  （其实 sql 语句的增删改查学会，95%的需求就能够搞定了)

首先要使用某数据库的表，先要用这个数据库 `use 库名;`
显示 该库里的所有的表 `show tables`
注释： -- 内容

增加：`insert into... 自己可以在网上查
注意： 如果遇上关键字同名情况，只需在这个被误解的关键字上加 ``

查询： `select * from users;` 查询 users 表中全部列的数据
但是这种\*的操作有点耗费性能

查某几个列的内容：例如 `select id, username from users;`

查询条件(增加 where)： `select * from users where username='zhangsan';`

多条件查询： 增加一个`and`或`or`就行, 例如：
`select * from users where username='zhangsan' and password='123';`
似乎对于字符串，使用单引号和双引号都是可以的

模糊查询： like '%...%'
如：`select * from users where username like '%zhang%'`

查找并排序：(order by 正序 order by desc 倒序)
例如:`select * from users where password like '%1%' order by id desc;`

##### 更新数据

update 表明 set 具体需更改的列的内容 where 条件
例如：`update users set realname='李四2' where username='lisi';`
(有可能会报错，解决方法： 输入 `SET SQL_SAFE_UPDATES=0;` 就可解决)

##### 删除数据

delete from 表名 where 条件 (注意： 如果不加 where，则表里的内容会全部被删除)

> 注意： 其实在正式的操作中，删除行不是如上图一样的操作而是再创建一个列 state 表示状态 0 1
> (1 表示 数据可用 0 表示 数据不可用)
> 如果要删除数据，就直接把 state 状态改为 0 就可以了，而不是真正的把数据删掉(估计这样做是为了更加的安全)
> 删除方法如下：`update users set state='0' where username='lisi';`
> 然后查询：`select * from users where state=1;`

上述的技术其实叫做软删除 而不是 真正的删除
(软删除的好处是数据好恢复)

小知识： =表示等于 <>表示不等于

---

简单讲一下数据类型:

- VARCHAR(10) 这里表示的是最多能够存储 10 个汉字
  (mysql 版本 > 5， 例如 varchar(10)，这里的 10 代表的是 10 个字符，不管是英文还是汉字都是 10 个)

##### 使用 Nodejs 操作 Mysql

(通过程序来连接数据库)

- 先用示例：用 demo 演示，不考虑使用
- 封装：将其封装为系统可用的工具
- 使用：让 API 直接操作数据库，不再使用假数据

> 下面在 blog-1-another 文件夹下创建了一个文件夹 mysql-test 用来测试 mysql

```
1. 先安装模块： npm init -y
2. 再安装npm模块： npm i mysql
3. 写代码
4. 执行代码： 终端： node + 文件名
```

注意一件事：
当 sql 用于数据改变的时候，结果会返回一个对象如下：

```
OkPacket {
  fieldCount: 0,
  affectedRows: 1,     // 影响的行数
  insertId: 0,
  serverStatus: 34,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1       // 更新的函数
}
```

上面的对象内的属性 对接口的建立，数据连接有大用！！

有一个问题需要注意一下：

```
在没有安装node_modules 的文件夹下，安装mysql  仅用  npm i mysql 就可以了。但是 如果在有了node_modules的文件夹下，安装 mysql 似乎要使用 npm i mysql --save  也不知道我这个猜测是否是对的。或者说写没写 --save 都没有问题
```

在 src 文件夹下再创建一个文件夹叫 conf。在这个文件下再创建一个文件 db.js 这里面存储的就是配置

在 db.js 里获取环境变量

```
// process 就是nodejs里面进程的一些信息
const env = process.env.NODE_ENV //  环境参数(这些数据其实在package.json 文件里的scripts就已经有定义了)
```

再在 src 文件夹下创建一个文件夹 db 用来放置和数据操作(涉及数据库)相关的文件

注意： 在同一个 promise 中，resolve() 和 reject() 只会有一个被运行

#### 登录

在 server 端 算比较重要的一个点。
登录在业界是有一个通用的方案的，所以我们根本就不用自创登录方法

核心：登录校验 & 登录信息存储

在传统网站中，有登录有注册。 现在注册已经过时了。现在是微信验证登录，手机验证码短信
(本项目不涉及)

登录是不会过时的

登录核心点：

- cookie 和 session (cookie 是实现登录的基础)
- 把 session 写入 redis(redis 是一个内存数据库， mysql 是一个硬盘数据库)
- 开发登录功能，和前端联调(用到 nginx 反向代理)

##### cookie 的介绍

- 什么是 cookie？

  > 就是存储在浏览器的一段字符串(最大 5kb)
  > 跨域不共享(浏览器为每一个域名都存储了一个 cookie )
  > 格式如 k1=v1;k2=v2;k3=v3; 因此可以存储结构数据
  > 每次发送 http 请求，会将请求域的 cookie 一起发给 server(请求域的 cookie 是指本次请求的请求域，比如在淘宝中请求了百度的一个 js 文件，这时候的请求域就是百度，尽管你现在在淘宝页面，发送的也只能是百度请求域的 cookie 等内容)
  > server 可以修改 cookie 并返回给浏览器
  > 浏览器中也可以通过 js 修改 cookie(有限制)

- js 操作 cookie，浏览器中查看 cookie 的方法？

  - 客户端查看 cookie，三种方式
    - chrome 的 Console 里通过 document.cookie 里去查看(这里的 js 查看 cookie 其实也是有限制的)
    - chrome 的 Network 里网络请求的 Request Header
    - chrome 的 Application 里 有 cookies 选项 可以看
  - js 查看、修改 cookie(这是有限制的) 事实上本地修改 cookie 的情况并不多。因为已近有了 localstorage 了
    - 在控制台运行 document.cookie='键值对;' // 这样达到的是累加 cookie，而不是覆盖之前的 cookie

- server 端操作 cookie，实现登录验证
  - 查看 cookie
  - 修改 cookie
  - 实现登录验证

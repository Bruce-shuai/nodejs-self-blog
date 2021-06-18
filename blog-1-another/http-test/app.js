/* GET 请求的操作 */
// const http = require('http');
// const querystring = require('querystring');

// const server = http.createServer((req, res) => {
//   console.log('method', req.method);
//   const url = req.url;
//   console.log('url: ', url);
//   req.query = querystring.parse(url.split('?')[1]);
//   res.end(JSON.stringify(req.query));  // 变成了字符串,这个res.end里的内容会返回到浏览器页面上
// })


/* POST 请求的操作 */
// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     // req 数据格式
//     console.log('content-type', req.headers['content-type']);
//     // 接受数据
//     let postData = '';
//     req.on('data', chunk => {   // 注意： chunk 本身是一个二进制格式，所以用toString()来让二进制变为正常的字符串
//       postData += chunk.toString();
//     })
//     req.on('end', () => {
//       console.log('postData', postData);
//       res.end(JSON.stringify(postData))
//     })
//   }
// })

/* 处理http请求的综合案例 */
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  /* 自己写的代码 */
  // if (req.method === 'GET') {
  //   console.log('method:', req.method);
  //   const url = req.url;
  //   req.query = querystring.parse(url.split('?')[1]);
  //   res.end(JSON.stringify(req.query));
  // }
  // if (req.method === 'POST') {
  //   console.log('method:', req.method);
  //   console.log('req content-type', req.headers['content-type']);
  //   const postData = '';
  //   req.on('data', chunk => {
  //     postData += chunk;
  //   })
  //   req.on('end', () => {
  //     res.end(JSON.stringify(postData))
  //   })
  // }

  /* 双越的代码 */
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = querystring.parse(url.split('?')[1]);

  // 设置返回格式为 JSON (这里的内容牛逼~)  JSON格式，客户端比较好解析
  res.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {   // 对象的方式 + es6语法
    method,
    url,
    path,
    query
  }

  // 返回
  if (method === 'GET') {
    res.end(  // 只能返回字符串或二进制，只不过这里的字符串是JSON格式
      JSON.stringify(resData)   
    )
  }
  if (method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      resData.postData = postData;  // 这里用得挺好的，给resData又增添了一个属性
      res.end(JSON.stringify(resData));
    })
  }
})


server.listen(8000);
console.log('ok');
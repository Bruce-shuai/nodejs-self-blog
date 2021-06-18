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
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // req 数据格式
    console.log('content-type', req.headers['content-type']);
    // 接受数据
    let postData = '';
    req.on('data', chunk => {   // 注意： chunk 本身是一个二进制格式，所以用toString()来让二进制变为正常的字符串
      postData += chunk.toString();
    })
    req.on('end', () => {
      console.log('postData', postData);
      res.end(JSON.stringify(postData))
    })
  }
})


server.listen(8000);
console.log('ok');
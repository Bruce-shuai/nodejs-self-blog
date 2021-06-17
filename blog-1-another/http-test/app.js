const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log('method', req.method);
  const url = req.url;
  console.log('url: ', url);
  req.query = querystring.parse(url.split('?')[1]);
  res.end(JSON.stringify(req.query));  // 变成了字符串,这个res.end里的内容会返回到浏览器页面上
})

server.listen(8000);
console.log('ok');
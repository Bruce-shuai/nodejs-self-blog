// 这个页面展示的是createServer的逻辑


const http = require('http')

const PORT = 8000   // 启动的端口
const serverHandle = require('../app') // 相对路径

const server = http.createServer(serverHandle);
server.listen(PORT);

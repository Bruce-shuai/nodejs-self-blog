// 业务代码
const serverHandle = (req, res) => {

  // 设置返回格式 为 JSON
  res.setHeader('Content-type', 'application/json');
  const resData = {
    name: '帅得乱七八糟',
    site: 'Bruce',
    age: '20',
    env: process.env.NODE_ENV
  }
  res.end(JSON.stringify(resData))
}

module.exports = serverHandle;
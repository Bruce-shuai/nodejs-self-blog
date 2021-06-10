const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {
    name: '双越',
    site: 'imooc',
    // process 是 node提供的一个全局变量
    env: process.env.NODE_ENV   // env 可以识别当前的开发环境(线上、线下等)
  }
  
  res.end(
    // 让resData 变成JSON字符串
    JSON.stringify(resData)  
  )
}

module.exports = serverHandle;
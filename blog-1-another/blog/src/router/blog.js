// 五个关于blog的接口 这里的函数要接受req, res这两个参数好对应app.js文件的内容
const handleBlogRouter = (req, res) => {
  const method = req.method;  // GET POST
  const url = req.url;
  const path = url.split('?')[0]

  //  开始实现接口：
  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '这是获取博客列表的接口'
    }
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '这是获取博客详情的接口'
    }
  }

  // 新建一篇博客  创建内容一般都是用的POST
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '这是新建一篇博客的接口'
    }
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '这是更新一篇博客的接口'
    }
  }

  // 删除一篇博客   这里的删除竟然也用的POST方法
  if (method === 'POST' && path === '/api/blog/del') {
    return {
      msg: '这是删除一篇博客的接口'
    }
  }
}

module.exports = handleBlogRouter;
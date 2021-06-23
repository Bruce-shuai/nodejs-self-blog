const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
// 五个关于blog的接口 这里的函数要接受req, res这两个参数好对应app.js文件的内容
const handleBlogRouter = (req, res) => {
  const method = req.method;  // GET POST
  const id = req.query.id;
  //  开始实现接口：
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const result = getList(author, keyword);  // result 是一个promise
    return result.then((listData) => {    // 这一行的return 可不能忘记加了， 这里返回的同样是Promise对象
      return new SuccessModel(listData);  // 这里的listData其实是一个对象
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id);
    return result.then(detailData => {
      return new SuccessModel(detailData);   // 这里的返回内容作为下一个then的参数
    })
  }

  // 新建一篇博客  创建内容一般都是用的POST
  if (method === 'POST' && req.path === '/api/blog/new') {
    // 由于是POST请求，所以是从req.body 里获取 post man的数据
    

    req.body.author = 'zhangsan';  // 假数据，待开发登录的时候再改成真实的数据
    
    const result = newBlog(req.body)
    return result.then(newBlogData => {
      return new SuccessModel(newBlogData)
    })
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel('更新博客失败')
    }
  }

  // 删除一篇博客   这里的删除竟然也用的POST方法
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(id);

    if (result) {
      return new SuccessModel(result)
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter;
const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
  const method = req.method;  // GET POST

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    // req.query  其实就是url 参数的内容(已转化为对象了)
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)   // 对应用户的数据
    // 返回正确的格式
    return new SuccessModel(listData)

    // return {
    //   msg:  '这是获取博客列表的接口'
    // }
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id;    // 这里的id是从url参数中获取的
    const detailData = getDetail(id);
    return new SuccessModel(detailData)
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '这是新建博客的接口'
    }
  }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
      return {
        msg: '这是更新一篇博客的接口'
      }
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
      return {
        msg: '这是删除一篇博客的接口'
      }
    }
}

module.exports = handleBlogRouter;
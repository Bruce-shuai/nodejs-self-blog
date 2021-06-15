const { 
  getList, 
  getDetail, 
  newBlog, 
  updateBlog, 
  delBlog 
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
  const method = req.method;  // GET POST
  const id = req.query.id;    // 这里的id是从url参数中获取的

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    // req.query  其实就是url 参数的内容(已转化为对象了)
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // 这里的result 其实就是promise了~
    const result = getList(author, keyword)   // 对应用户的数据
    return result.then(listData => {
      return new SuccessModel(listData)
    })
    
    // 返回正确的格式
    // return new SuccessModel(result)

    // return {
    //   msg:  '这是获取博客列表的接口'
    // }
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const detailData = getDetail(id);
    // return new SuccessModel(detailData)
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data);
    req.body.author = 'zhangsan';    // 假数据，待开发登录时再改成真实数据
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data);
    })
  }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
      const result = updateBlog(id, req.body)
      return result.then(
        val => {
          if (val) {
            return new SuccessModel()
          }else {
            return new ErrorModel('更新博客失败');
          }
        }
      )
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
      const author = 'zhangsan';  // 假数据
      const result =  delBlog(id, author)
      return result.then(val => {
        if (val) {
          return new SuccessModel();
        } else {
          return new ErrorModel('删除博客失败')
        }
      })
      
    }
}

module.exports = handleBlogRouter;
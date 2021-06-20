// author、keyword 都是通过query来获取的
// 其实原理就是通过url的参数来返回相应的数据给浏览器
const getList = (author, keyword) => {
  // 先返回一点假数据，格式是正确的
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1111111111,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 2222222222,
      author: 'lisi'
    }
  ]
} 

// 通过参数id来获取详情
const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1111111111,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content属性
  console.log('new BlogData...', blogData);
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  console.log('update blog', id, blogData);
  return true;   // true  返回成功
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
}
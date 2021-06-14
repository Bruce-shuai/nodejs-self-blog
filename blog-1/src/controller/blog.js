//  controller 是来关心数据的~

const getList = (author, keyword) => {
  // 先返回假数据（格式是正确的）
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 154661049111,
      author: '张三'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 154661049111,
      author: '李四'
    },
    {
      id: 3,
      title: '标题C',
      content: '内容C',
      createTime: 154661049111,
      author: '王小五'
    }
  ]
}

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 154661049111,
    author: '张三'
  }
}

const newBlog = (blogData = {}) => {  // blogData = {} 只是一个默认值而已
  // blogData 是一个博客对象，包含title content属性

  return {
    id: 3    // 表示新建博客，插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  // blogData 是一个博客对象，包含title content属性

  console.log('update blog', id, blog)
  return true;
}

const delBlog = (id) => {
  // id 就是要删除博客的id
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
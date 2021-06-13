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

module.exports = {
  getList,
  getDetail
}
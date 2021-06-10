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
      title: '标题A',
      content: '内容A',
      createTime: 154661049111,
      author: '李四'
    },
    {
      id: 3,
      title: '标题A',
      content: '内容A',
      createTime: 154661049111,
      author: '王小五'
    }
  ]
}

module.exports = {
  getList
}
const { exec } = require('../db/mysql');  // 注意：exec是一个Promise

// author、keyword 都是通过query来获取的
// 其实原理就是通过url的参数来返回相应的数据给浏览器
const getList = (author, keyword) => {
  // 删掉了假数据
  // 开始使用数据库的内容
  // 先定义一个sql语句   1=1的作用是占位置 如果不写这个，那么当author和keyword 都没有值，就麻烦了
  let sql = `select * from blogs where 1=1 ` // 最后这里有个空格
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }

  sql += `order by createtime desc;`;  // 注意这里的;符号

  // 返回的是一个promise
  return exec(sql);
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

/** 下面的POST请求似乎都是围绕着id来运行的代码 */

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  console.log('update blog', id, blogData);
  return true;   // true  返回成功
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
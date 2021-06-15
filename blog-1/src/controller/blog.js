//  controller 是来关心数据的~
const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  // 注意下面用的符号  模板字符串
  let sql = `select * from blogs where 1=1 `  // 1=1是用来占位置的，就是为了防止author、keyword都没值的情况
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]   // 这里返回的还是promise实例
  })
}

const newBlog = (blogData = {}) => {  // blogData = {} 只是一个默认值而已
  // blogData 是一个博客对象，包含title content author属性
  const title = blogData.title;       // 如果是空对象，那么title的值是什么呢？会报错吗？
  const content = blogData.content;
  const author = blogData.author;
  const createtime = Date.now();

  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createtime}', '${author}'); 
  `
  return exec(sql).then(insertData => {
    console.log('insertData is ', insertData);
    return {
      id: insertData.insertId
    }
  });
}

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title;
  const content = blogData.constent;

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `

  return exec(sql).then(updataData => {
    // console.log('updateData is ', updateData);
    if (updateBlog.affectedRows > 0) {
      // affectedRows 是一个什么东西呢？
      return true;
    }
    return false;
  })
}

const delBlog = (id, author) => {
  // id 就是要删除博客的id
  const sql = `delete from blogs where id='${id}' and author=${author}`
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
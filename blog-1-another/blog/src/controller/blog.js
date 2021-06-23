const { exec } = require('../db/mysql');  // 注意：exec是一个Promise

// 似乎GET请求都是用的select 查询语句来解决问题？！
// POST 请求 用的是insert语句 或者  update、delete语句

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
    sql += `and title like '%${keyword}%'`   // 使用的模糊查询
  }

  sql += `order by createtime desc;`;  // 注意这里的;符号

  // 返回的是一个promise
  return exec(sql);
}  

// 通过参数id来获取详情
const getDetail = (id) => {
  // 先返回假数据
  // return {
  //   id: 1,
  //   title: '标题A',
  //   content: '内容A',
  //   createTime: 1111111111,
  //   author: 'zhangsan'
  // }

  // 通过sql语句来获取数据库里面的数据
  let sql = `select * from blogs where id='${id}'`;
  // 这里的返回有点学问~  因为这个sql语句(查id) 只会查找出一个元素出来，但哪怕一个元素，返回的也是一个数组
  return exec(sql).then(rows => {   // 要返回一个对象，而不是返回一个数组，所以取出数组的第一个元素出来
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content, author属性
  // console.log('new BlogData...', blogData);
  // return {
  //   id: 3
  // }

  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime =  Date.now();

  // 注意，这里用的是插入语句   插入的时候列的顺序是乱的应该没有影响吧？  createTime 是数字格式，可以不加单引号
  let sql = `
    insert into blogs (title, content, createtime, author) 
    values ('${title}', '${content}', '${createTime}', '${author}');
  `
  // 注意：在sql语句中，执行新增或执行减少的时候，返回的是一堆数据，这里面的数据返回的是这一次操作的执行结果
  return exec(sql).then(insertData => {
    console.log('insertData is ', insertData);
    /**
     * insertData 对象为:
     * OkPacket {
     *  fieldCount: ..,
     *  affectedRows: ..,
     *  insertId: 3,       // 表示本次插入的id是多少
     *  serverStatus: 2,
     *  warningCount: 0,
     *  message: '',
     *  protocol41: true,
     *  changedRows: 0
     * }
     */
    return {
      id: insertData.insertId
    }
  })
}

/** 下面的POST请求似乎都是围绕着id来运行的代码 */

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的id
  // console.log('update blog', id, blogData);
  // 作者是不会更新的

  const title = blogData.title;
  const content = blogData.content;

  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  return exec(sql).then(updateData => {
    // 更新内容大于0则说明更新成功，否则返回false
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false
  });   // true  返回成功
}

const delBlog = (id, author) => {
  // id 就是要删除博客的id
  // 本次项目就不使用软删除了，但在实际项目中，优先考虑软删除
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  
  return exec(sql).then(deldateData => {
    if (deldateData.affectedRows > 0) {   // 这里同样是affectedRows
      return true;
    }
    return false;
  });
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
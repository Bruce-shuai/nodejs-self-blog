// 其实就是用代码代替了图形化界面(workbench)的使用
const mysql = require('mysql');

// 创建连接对象   host 是域
const con = mysql.createConnection({
  host: 'localhost',      // host 是域
  user: 'root',
  password: '123456',
  port: '3306',           // mysql的端口号 
  database: 'myblog'      // 类似workbench use myblog; 这条语法  
})
// 其实workbench 也是通过上面的内容来进行和数据库的连接的

// 开始连接
con.connect();

// 执行 sql 语句
const sql = `update users set realname='李四2' where username='lisi';`;
// 下面讲解如何去查询  con.query()   注意，这个方法是是异步的
con.query(sql, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
})

// 关闭sql连接
con.end();
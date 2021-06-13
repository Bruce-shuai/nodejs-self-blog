// 以下是nodejs 提供的模块~
const fs = require('fs')      // nodejs 原生模块~ 文件操作~
const path = require('path')  // nodejs 原生模块~ 操作文件之间的路径~

/**
 * 
 * @param {*} fileName 只显示文件的名字
 * @param {*} callback 回调函数
 * fullFillName:  获取文件的绝对路径（在电脑上的）
 */
function getFileContent(fileName, callback) { 
  //__dirname 让在任何电脑上都能有正确的路径 
  // path.resolve 方法将路径或路径片段的序列解析为绝对路径
  // 自动将参数通过/来拼接
  const fullFillName = path.resolve(__dirname, 'files', fileName)
  console.log('fullFillName', fullFillName);

  // 用于异步读取文件的全部内容
  fs.readFile(fullFillName, (err, data) => {
    if (err) {   // 数据有误的时候
      console.error(err);
      return;
    } 
    // data 是文件的内容
    callback(
      JSON.parse(data.toString())
    )
  })
}

// callback-hell
getFileContent('a.json', aData => {
  console.log('a data', aData);
  getFileContent(aData.next, bData => {
    console.log(bData.next, bData);
    getFileContent(bData.next, cData => {
      console.log('c data', cData);
    })
  })
})

// 参数callback已经在Promise的then中实现了 
function getFileContent_P(fileName) {
  return new Promise((resolve, reject) => {
    const fullFillName = path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFillName, (err, data) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(
          JSON.parse(data.toString())
        );
      }
    })
  })
}

getFileContent_P('a.json').then(data => {
  console.log('A', data);
  return getFileContent_P(data.next);
}).then(data => {
  console.log('B', data);
  return getFileContent_P(data.next);
}).then(data => {
  console.log('C', data);
})




// const p = new Promise((resolve, reject) => {
//   const file = require('./files/a.json');
//   resolve(file.next)
//   console.log('msga', file.msg);
// })

// p.then(url => {
//   const file = require(`./files/${url}`)
//   console.log('msgb', file.msg);
//   return file.next
// }).then(url => {
//     const file = require(`./files/${url}`)
//     console.log('msg', file.msg);
//   }
// )
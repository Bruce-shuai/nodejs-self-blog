// 通过用户、密码登录来获取对应的用户信息和权限
const loginCheck = (username, password) => {
  // 先试用假数据
  if (username === 'zhangsan' && password === '123') {
    return true;
  }
  return false;
}

module.exports = {
  loginCheck
}
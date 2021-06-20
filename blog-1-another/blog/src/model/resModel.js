class BaseModel {
  // data 对象   message 字符串
  constructor(data, message) {
    // 这是为了兼容只穿了一个参数的情况
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {   // 因为message为null了,自然 不会再运行这一行的代码了
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);   // 执行父类
    this.errno = 0;         // errno 是新创的属性 
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
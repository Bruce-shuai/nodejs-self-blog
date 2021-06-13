class BaseModel {
  constructor(data, message) {
    // 本来data是接受对象，message接受字符串。第一个if的意思是
    // 如果只传了一个值即data，传的就是string的情况。
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0;        // 这是直接写出来就创出来的this属性
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1;
  }
}
  
module.exports = {
  SuccessModel,
  ErrorModel
}
const moment = require('moment');
module.exports = {
  //uuid格式：年月日时分秒3位毫秒+3位随机数，共20位  ===>   20190312162455043167
  uuidSet() {
    let uuid = moment().format("YYYYMMDDHHmmssSSS");
    uuid += (Array(3).join(0) + Math.random()*100).slice(-3);
    return uuid;
  },
  //获取token并转码为uuid
  uuidGet(){
    const token = this.ctx.request.header.authorization;
    let decode = this.ctx.app.jwt.verify(token, this.ctx.app.options.secret);
    return decode.uuid
  },
  //注册生成随机昵称
  makeName(){
    let num = Math.random(0.9).toString()
    let user_name = '花名'+num.substring(0,6)
    return user_name
  }
}

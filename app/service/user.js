'use strict';

const Service = require('egg').Service;
const JSEncrypt = require('node-jsencrypt')//前端非对称加密，后端Node.js解密(jsencrypt插件)
let bcrypt = require('bcryptjs'); //bcryptjs是一个第三方加密库，用来实现在Node环境下的bcrypt加密
const crypto = require('crypto');
let moment=require('moment');

class UserService extends Service {
  // 鉴权回调
  async loginCallBack() {
    let { ctx } = this;
    if (ctx.isAuthenticated()) {
      ctx.body = {
        code: 0,
        data: ctx.user,
        message: '',
      };
    } else {
      ctx.body = {
        code: 1, 
        data: null,
        message: '用户名或密码错误'
      }
    }
  }
  //注册
  async register(){
    const { ctx,app } = this
    // 设置私钥
    const prvKey = this.app.config.private_key
    let jsencrypt = new JSEncrypt()
    jsencrypt.setPrivateKey(prvKey)
    // 解密数据
    let paramsData = ctx.request.body.rsaParams
    let prvData = JSON.parse(jsencrypt.decrypt(paramsData));
    //查找注册账号是否存在
    const is_user_numnber = await ctx.model.User.findOne({where:{user_number:prvData.user_number}})
    if(!prvData.user_number||prvData.user_number == ''){
      return ctx.warn('账号不能为空')
    }else if(!prvData.user_password||prvData.user_password == ''){
      return ctx.warn('密码不能为空')
    }else if(is_user_numnber!=null){
      return ctx.warn('账号已被注册')
    } else{
      //对密码进行hash加密,salt加盐
      const salt = bcrypt.genSaltSync(10)
      const user_password = bcrypt.hashSync(prvData.user_password, salt);
      let res = {};
      const params = {
        uuid:ctx.helper.uuidSet(),
        user_name:ctx.helper.makeName(),
        user_number:prvData.user_number,
        user_password:user_password,
        user_type:0,
        salt:salt,
        create_time:new Date()
      }
      try {
          await ctx.model.UserLogin.create(params)
          res = await ctx.model.User.create(params);
          ctx.logger.info(res)
          return ctx.success('注册成功');
      } catch (err) {
          ctx.logger.error(err);
          return ctx.fail(err)
      }
    }
  }
  //登录
  async login(){
    const { ctx,app } = this
    // 设置私钥
    const prvKey = this.app.config.private_key
    let jsencrypt = new JSEncrypt()
    jsencrypt.setPrivateKey(prvKey)
    // 解密数据
    let paramsData = ctx.request.body.rsaParams
    let prvData = JSON.parse(jsencrypt.decrypt(paramsData));
    const user_number = prvData.user_number
    const user_password = prvData.user_password
    // 查找用户名
    let user = await ctx.model.User.findOne({include:{as:'menu',model:ctx.model.UserLogin},where:{user_number:user_number}})
    if(!user){
      return ctx.fail('账号或密码不存在')
    }
    //校验密码
    let res = bcrypt.compareSync(user_password,user.dataValues.menu.dataValues.user_password)
    if(res){
      //更新登录数据
      await ctx.model.User.update({login_num:user.dataValues.login_num+1,last_login_time:moment()},{where:{uuid:user.dataValues.uuid}});
      //生成token
      const token = app.jwt.sign({
        'uuid': user.dataValues.uuid, //需要存储的 token 数据
      }, app.config.jwt.secret, { expiresIn: '5m' }); // 5分钟token过期

      //存储session参数
      ctx.session.uuid = user.dataValues.uuid;
      ctx.session.user_number = user_number;
      console.log('登录session参数',ctx.session.uuid)
      return ctx.success("登录成功!",{ token });
    }else{
      return ctx.fail("用户名或密码错误!");
    }
  }
  //退出登录
  async logout(){
    const { ctx,app } = this
    const token = ctx.request.header.token
    let uuid =  ctx.helper.uuidGet(token)
    let user = await ctx.model.User.findOne({where:{uuid:uuid}})
    if(user){
      //清空登录session信息
      ctx.session.uuid = null
      ctx.session.user_number = null
      return ctx.success("登出成功！");
    }else{
      return ctx.fail("登出失败！");
    }
  }
}

module.exports = UserService;

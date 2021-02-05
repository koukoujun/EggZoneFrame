/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611899213926_5071';

  //private key
  config.private_key = `-----BEGIN PRIVATE KEY-----
  MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAOiu8BdHHqLl0OE9
  JsL5IwMqjR8VBagrjfLzMiNg+y/DIQy3PRF3TKqriQZd5Ig79ftFyyq+a3YRUIYf
  9rDcBC3QZB3JvgpMR9izPnonPJgcaLi5tLCxA/ZJHiW4+Dy9BTO6zLG5Db7rA6kp
  MAPqY6OUlyii2AY0m72rUjG0iWqFAgMBAAECgYACxPI+lK4cqjeONrgbYfO0ufDs
  CcgDdGFAHvzdxu22Z9Ag4p1rc8wJy/jZhoyNwoju8Km2XIXS5enbbs301OmHzD/d
  81/ESdxYr+Mj69raIplihzikF3GzSLxZvfP71R7RO37Q7bdrq1yi922X7xX6CP4p
  2owGKCGUQoXfX6NWkQJBAPUtqbwzMgTpDmak76co3TdgadjuUTCqKTyoW+bz7+kN
  JdRh0TQ4FBKVM7SCUdL1pftqFQU696diJQ/qcAt3UB8CQQDy9BcXezOkX0RQmEqA
  esosFRD5/byvBjKmLhU1OYorDumx44RyVy6G76nyhoU7j8GL+5FpzBZgrP75On+G
  DCDbAkBBkde+DFcJNybxzpSFOQmIgNFuAbZW9HsYzNHfP0ffJPQEC7D+bSz5F0v/
  r4agi6+7QFCk2HNZIYdV7VXPyzXzAkAQ8+FMnScsWA1vRkEkl+zViJ7HouHwoJEW
  MW7/aMVwXbkG1aZfSCASAFUufB592nkZ6HLsG/aPxmKAR4mwc9YzAkEAp6GulgCT
  tb/dWDS6h7Y8fx9iBmMli2kDIDkW83an/PK/VNMOzv+uwFoXbJUxC4gRbVhvpckh
  fn3dcjVI+HwQMw==
  -----END PRIVATE KEY-----`

  // add your middleware config here
  config.middleware = ['errorHandler'];
  config.jwt = {
    secret: '123456',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // swagger配置
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径
    // 接口文档的标题，描述或其它
    apiInfo: {
      title: 'EggZoneFrame-Api', // 接口文档的标题
      description: '接口api文档(开发环境)', // 接口文档描述
      version: '1.0.0', // 接口文档版本
    },
    schemes: [ 'http', 'https' ], // 配置支持的协议
    consumes: [ 'application/json' ], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: [ 'application/json' ], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    securityDefinitions: { // 配置接口安全授权方式
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）
    enableValidate: false, // 是否启用参数校验，默认 true（启用）
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)
    enable: true, // 默认 true (启用),
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://127.0.0.1' ],
  };
  config.cors = {
    origin: 'http://127.0.0.1:8080',//一定要是域名端口
    credentials:true,//credentials设置为true,和前端保持一致
    allowMethods: 'GET,POST'
  }

  //session配置
  config.session = {
    key: 'EGG_SESS',  //eggjs默认session的key
    maxAge: 24 * 3600 * 1000,  // 1 day
    httpOnly: true,
    encrypt: true,
    renew: true  //每次访问页面都会给session会话延长时间
    };

  //passport 鉴权(用于第三方登录)
  config.passportLocal = {
    usernameField: 'username',
    passwordField: 'password',
  };

  return {
    ...config,
    ...userConfig,
  };
};

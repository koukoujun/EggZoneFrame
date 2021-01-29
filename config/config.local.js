'use strict';

module.exports = () => {

  const config = exports = {};

  config.logger = {
    dir: '../logs/local', // 打印目录重定向
    outputJSON: true, // json格式输出
  };

  // 数据库配置
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'admin',
      // 密码
      password: '123456',
      // 数据库名
      database: 'EggZoneFrame',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return {
    ...config,
  };
};


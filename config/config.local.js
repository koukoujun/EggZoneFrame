'use strict';

module.exports = () => {

  const config = exports = {};

  config.logger = {
    dir: './logs/local', // 打印目录重定向
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

  config.sequelize = {
    //数据库类型
    dialect: 'mysql',
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
    // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
    timezone: '+08:00',
    define: {
      timestamps: false, //timestamps默认值是true，如实是true会自动添加上 create_time 和update_time两个字段
      freezeTableName: true //freezeTableName默认值是 false 如果是false的话，会自动在表名后加s复数
    },
  };

  return {
    ...config,
  };
};


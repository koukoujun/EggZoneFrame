'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 配置 egg-swagger-doc 插件信息
  swaggerdoc: {
    enable: true, // 启用 swagger-ui 默认启用
    package: 'egg-swagger-doc', // 指定 第三方插件 包名称
  },
  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // passport 鉴权
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },
  //sequelize 数据库访问orm
  sequelize : {
    enable: true,
    package: 'egg-sequelize',
  },
  //jwt
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

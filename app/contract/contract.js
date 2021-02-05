
/* 配置swagger请求示例数据 */

module.exports = {
  // test data (delete test data when you use it)
  test: {
    name: { type: 'string', required: true, enum: 'test' },
  },
  // contract data
  /* user */
  // 注册
  user_register: {
    user_name: { type: 'string', required: true, enum: 'admin' },
    user_password: { type: 'string', required: true, enum: '123456' },
  },
  // 登录
  user_login: {
    user_name: { type: 'string', required: true, enum: 'admin' },
    user_password: { type: 'string', required: true, enum: '123456' },
  }
};

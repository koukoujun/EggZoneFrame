'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  // test (delete test data when you use it)
  async test() {
    const result = await this.app.mysql.query('select * from test', '');
    const a = this.ctx.request.header.token;
    this.ctx.logger.info('token数据', a);
    return JSON.stringify({
      code: 1,
      message: 'success',
      data: a,
    });
  }

  // service module
}

module.exports = HomeService;

'use strict';

/**
 * @Controller
**/

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // test (delete test data when you use it)
  async test() {
    /**
    * @summary 测试数据库连接
    * @description 测试swagger
    * @router post /home/test
    * @request body test 配置请求携带参数
    * @Request header string token eg：write your params at here
    * @response 200 JsonResult 操作结果
    */
    const { ctx } = this;
    ctx.body = await this.service.home.test();
  }

  // controller module
}

module.exports = HomeController;


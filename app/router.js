'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 重定向到swagger
  router.redirect('/', '/swagger-ui.html', 302);
  // rotuer module
  router.get('/home/test', controller.home.test);
};

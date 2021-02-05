'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller , middleware } = app;
  // 重定向到swagger
  router.redirect('/', '/swagger-ui.html', 302);
  // middleware
  const jwtErr = middleware.jwtErr(app.config.jwt)
  // rotuer module
  router.post('/home/test',jwtErr,controller.home.test);
  /* user */
  //register
  router.post('/user/register',controller.user.register);
  // login
  router.post('/user/login', controller.user.login);
  // logout
  router.post('/user/logout', controller.user.logout);
};

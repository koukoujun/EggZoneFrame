/**
 * 统一错误处理
 * @returns {Function}
 */
module.exports = () => {
  return async function errorHandler(ctx) {
      //记录错误日志
      ctx.logger.error(ctx.response)

      const status = ctx.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'? '服务器异常，请联系客服。': ctx.response.message;
      // 处理错误类型
      if (ctx.acceptJSON) {
        switch(status){
          case 404:
            ctx.status = 404
            ctx.body = {code:'-1', message: 'Not Found' };
          break;
          case 500: 
            ctx.status = 500
            ctx.body = {code:'-1', message: JSON.stringify(error) };
          break;
          default:
            ctx.status = status
            ctx.body = {code:'-1', message: ctx.error };
          break;
        }
      } else {
          await ctx.render('500',{msg:JSON.stringify(error)});
      }
  };
};
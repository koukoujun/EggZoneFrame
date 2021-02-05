//middleware/jwtErr.js
module.exports = (options) => {
  return async function jwtErr(ctx, next) {
      const token = ctx.request.header.token;
      let decode = '';
      if (token) {
        try {
          // 解码token
          decode = ctx.app.jwt.verify(token, options.secret);
          await next();
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            massage: 'token已过期，请重新登录',
            code: -1,
          };
          return;
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          message: 'token不存在',
          code: -1,
        };
      }
    };
}
module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
            ctx.body = Object.assign({}, {code: 0, msg: '', data: ctx.body});
        } catch(err) {
            ctx.app.emit('error', err, ctx);
            const status = err.status || 500;
            const error = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message;
            ctx.body = { 
                code: status,
                msg: error,
                data: ''
             };
            if(status === 500) {
                ctx.body.detail = err.errors;
            }
            ctx.status = status;
        }
    }
}
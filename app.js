module.exports = app => {
    app.once('server', server => {
        console.log('server started!');
    });
    app.on('error', (err, ctx) => {
        console.error(err);
    });
    app.on('request', ctx => {
        console.log('request....');
    });
    app.on('response', ctx => {
        const used = Date.now() - ctx.starttime;
        console.log('request used ', used);
    });
    app.beforeStart(async () => {
        // 可以在请求的时候获取Context实例,但是在非用户请求的时候可以通过Application.createAnonymousContext()方法创建一个匿名的Context实例
        const ctx = app.createAnonymousContext();
        await ctx.service.home.list();
    });
}
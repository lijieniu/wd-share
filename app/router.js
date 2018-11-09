module.exports = app => {
    // router定义: router.head/options/get/put/post/patch/delete(del)/redirect
    // router-name: 给路由设定一个别名
    // path-match: 路由url路径
    // controller可以简写为一个字符串: router.get('path-match', 'user.info');
    // router.verb('path-match', app.controller.action);
    // router.verb('router-name', 'path-match', app.controller.action);
    // router.verb('path-match', middleware1, ...., app.controller.action);
    // router.verb('router-name', 'path-match', middleware1, ..., app.controller.action);
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/user/hhh', controller.user.hhh);
    router.get('/user/:id', controller.user.info);

    router.redirect('/hhh', '/', 302);

    require('./router/users')(app);
}
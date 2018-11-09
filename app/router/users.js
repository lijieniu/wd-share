module.exports = app => {
    const { router, controller } = app;
     // RESTful风格的url定义
     router.resources('users', '/api/v1/users', controller.v1.users);
}
module.exports = app => {
    const { router, controller } = app;
    router.resources('user', '/admin/api/users', controller.user);
}
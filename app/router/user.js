module.exports = app => {
    const { router, controller } = app;
    router.resources('user', '/admin/api/user', controller.user);
}
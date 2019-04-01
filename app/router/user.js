module.exports = app => {
    const { router, controller } = app;
    router.resources('user', '/admin/api/user', controller.user);
    router.post('/admin/api/graphql', controller.user.graphql);
    router.get('/admin/api/graphql2', controller.user.graphql2);
}
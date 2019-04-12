module.exports = (app) => {
    const { router, controller } = app;
    router.resources('topic', '/admin/api/topic', controller.topic);
}
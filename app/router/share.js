module.exports = (app) => {
    const { router, controller } = app;
    router.resources('share', '/admin/api/share', controller.share);
}
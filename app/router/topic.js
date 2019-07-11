module.exports = (app) => {
    const { router, controller } = app;
    router.resources('topic', '/admin/api/topic', controller.topic);
    router.get('/admin/api/getWeekTopic', controller.topic.getWeekTopic);
}
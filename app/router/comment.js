module.exports = (app) => {
  const { router, controller } = app;
  router.resources('comment', '/admin/api/comment', controller.comment);
}
'use strict';
module.exports = app => {
  require('./router/user')(app);
  const { router, controller } = app;
  router.get('/', controller.admin.home);
  router.get('/admin/api/article/list', controller.admin.list);
  router.post('/admin/api/article/add', controller.admin.add);
  router.get('/admin/api/article/del/:id', controller.admin.del);
  router.get('/admin/api/article/:id', controller.admin.detail);
  router.get('/admin/qrcode', controller.admin.qrcode);
  router.get('/admin(/.+)?', controller.admin.home);
};
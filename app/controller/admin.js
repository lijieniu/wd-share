'use strict';
const egg = require('egg');
const qrcode = require('qr-image');

module.exports = class AdminController extends egg.Controller {
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, '');
    await ctx.renderClient('admin.js', { ctx, url });
  }
  async list(ctx) {
    this.ctx.body = await ctx.service.article.getArtilceList(ctx.request.bdoy);
  }
  async add(ctx) {
    ctx.body = await this.service.article.saveArticle(ctx.request.body);
  }
  async del(ctx) {
    const { id } = ctx.params;
    ctx.body = await this.service.article.deleteArticle(id);
  }
  async detail(ctx) {
    const { id } = ctx.params;
    ctx.body = await ctx.service.article.query({ id: Number(id) });
  }
  async qrcode(ctx) {
    let img = qrcode.image('/user/sign', {type: 'png'});
    this.ctx.body = img;
  }
};
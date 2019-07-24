'use strict';
const egg = require('egg');
const qrcode = require('qr-image');
const request = require('request');
const crypto = require('crypto');

module.exports = class AdminController extends egg.Controller {
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, '');
    
    if(!ctx.session.userInfo && ctx.url !== '/admin/login') {
      ctx.redirect('/admin/login');
    }
    await ctx.renderClient('admin.js', { ctx, url, userInfo: ctx.session.userInfo });
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
  async uploadfile(ctx) {
    request.post({
      url: 'https://fex.wandougongzhu.cn/upfile',
      formData: ctx.request.files[0].filepath,
    }, (err, res, body) => {
      console.log(body);
    });
  }
  async login(ctx) {
    let {username, password} = ctx.request.body;
    let form_params = {
      username,
      password,
    }
    let checkResult = await this.check(form_params);
    if(!checkResult.errno) {
      let md5 = crypto.createHash('md5');
      form_params.password = md5.update(form_params.password).digest('hex');
      let userInfo = await ctx.service.user.findUserByUsername(form_params.username);
      if(userInfo) {
        userInfo.password = form_params.password;
        await ctx.service.user.updateUserByUsername(userInfo);
        delete userInfo.id;
        delete userInfo.password;
        ctx.session.userInfo = userInfo;
        ctx.body = checkResult;
      } else {
        await ctx.service.user.saveUser(form_params);
        delete form_params.password;
        ctx.session.userInfo = form_params;
        ctx.body = form_params;
      }
    } else {
      ctx.body = checkResult.errmsg;
    }
  }
  async check(form_params) {
    let checkResult = await new Promise((resolve, reject) => {
      request.post({
        url: 'https://service.inagora.org:50433/auth/check',
        strictSSL: false,
        formData: form_params,
        json: true
      }, (err, res, body) => {
        console.log(body);
        if(body) {
          resolve(body);
        } else {
          reject(err);
        }
      });
    }).then(checkResult => {
      return checkResult;
    });
    return checkResult;
  }
  async logout(ctx) {
    ctx.session.userInfo = null;
  }
};
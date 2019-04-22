'use strict';
const egg = require('egg');
const qrcode = require('qr-image');
const ldap = require('ldapjs');
const request = require('request');

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
  async login(ctx) {
    // let ldapClient = ldap.createClient({
    //   url: 'https://service.inagora.org:50433/auth/check'
    // });
    // client.bind('uid=supbind, cn=users, dc=tiger, dc=com', '111111', function(err, res) {
    //   console.log(res);
    // });
    let {username, password} = ctx.request.body;
    let form_params = {
      username,
      password,
    }
    // ldap验证
    await new Promise((resolve, reject) => {
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
    }).then(res => {
      if(!res.errno) {
        ctx.body = res;
      } else {
        ctx.body = res.errmsg;
      }
    });
  }
};
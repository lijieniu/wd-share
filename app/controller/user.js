const Controller = require('egg').Controller;
const crypto = require('crypto');

class UserController extends Controller{
    async index() {
        this.ctx.body = [
            {
                username: 'niu'
            }
        ];// await this.ctx.service.user.getUserList();
    }
}

module.exports = UserController;
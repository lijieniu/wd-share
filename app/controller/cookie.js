const Controller = require('egg').Controller;

class CookieController extends Controller {
    async add() {
        let count = this.ctx.cookies.get('count');
        count = count ? Number(count) : 0;
        this.ctx.cookies.set('count', `${++count};token=niu`);
        this.ctx.body = count;
    }
    async remove() {
        const count = this.ctx.cookies.set('count', null);
        this.ctx.status = 204;
    }
}

module.exports = CookieController;
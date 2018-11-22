const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        let buf = Buffer.from('test');
        console.log(buf.toString());
        const dataList = await this.ctx.service.home.list(1);
        throw new Error();
        
        await this.ctx.render('home/index.tpl', dataList);
    }
}

module.exports = HomeController;
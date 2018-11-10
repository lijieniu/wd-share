const Controller = require('egg').Controller;

class FileController extends Controller {
    async upload() {
        const file = this.ctx.request.files[0];
        console.log(file);
        this.ctx.body = 'upload success'
    }
}

module.exports = FileController;
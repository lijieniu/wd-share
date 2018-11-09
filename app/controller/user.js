const Controller = require('./core/base_controller');

class UserController extends Controller {
    async info() {
        const { ctx } = this;
        this.success({
            name: `hello ${ctx.params.id}`
        });
    }

    async hhh() {
        this.notFound();
    }
}

module.exports = UserController;
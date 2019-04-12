const Controller = require('egg').Controller;

class TopicController extends Controller {
    async index() {
        this.ctx.body = {
            list: [
                {
                    username: 'niu',
                    department: '前端',
                    title: '优雅的标题',
                    desc: '这里教你怎样优雅的分享',
                    share_time: '2019-01-19 17:00:00',
                    room: '大会议室'
                }
            ],
            total: 1
        }
    }
};
module.exports = TopicController;
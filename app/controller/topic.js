const Controller = require('egg').Controller;

class TopicController extends Controller {
    async index() {
        let topicList = await this.ctx.service.topic.getTopicList();
        this.ctx.body = {
            list: topicList,
            total: 10
        }
    }

    async create() {
        let { ctx } = this;
        let topicInfo = ctx.request.body;
        let saveResult = await ctx.service.topic.saveTopic(topicInfo);
        this.ctx.body = saveResult;
    }
};
module.exports = TopicController;
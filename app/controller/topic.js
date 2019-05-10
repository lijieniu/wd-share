const Controller = require('egg').Controller;

class TopicController extends Controller {
    async index() {
        let query = this.ctx.query;
        let topicList = await this.ctx.service.topic.getTopicList(query);
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

    async destroy() {
        let { ctx } = this;
        let topicId = ctx.params.id;
        let deleteResult = await ctx.service.topic.deleteTopic({id: topicId});
        this.ctx.body = deleteResult;
    }

    async show() {
        let { ctx } = this;
        let topicId = ctx.params.id;
        let topicInfo = await ctx.service.topic.getTopicById({id: topicId});
        let commentList = await ctx.service.comment.getCommentByTopicId({topic_id: topicId});
        topicInfo.commentList = commentList;
        this.ctx.body = topicInfo;
    }
};
module.exports = TopicController;
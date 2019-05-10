const Controller = require('egg').Controller;

class CommentController extends Controller {
  async create() {
    let { ctx } = this;
    let commentInfo = ctx.request.body;
    let userInfo = ctx.session.userInfo;
    if(userInfo) {
      commentInfo.user_name = userInfo.username;
    }
    await ctx.service.comment.saveComment(commentInfo);
  }
}

module.exports = CommentController;
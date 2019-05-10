const Service = require('egg').Service;
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');

class CommentService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.collection = new Collection(ctx.db, 'comment');
  }
  async saveComment(json) {
    await this.collection.add(json);
  }

  async getCommentByTopicId(field) {
    let query = new Query();
    query.where = field;
    query.orderByField = 'id';
    query.orderBy = 'desc';
    let result = await this.collection.get(query);
    return result;
  }
}

module.exports = CommentService;
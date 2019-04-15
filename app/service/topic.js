const Service = require('egg').Service;
const Collection = require('../lib/db/collection');

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.collection = new Collection(ctx.db, 'topic');
  }
  async saveTopic(topicInfo) {
    let result = await this.collection.add(topicInfo);
    return result;
  }
  async getTopicList() {
    let result = await this.collection.get();
    return result;
  }
  async deleteTopic(field) {
    let result = await this.collection.delete(field);
  }
}

module.exports = TopicService;
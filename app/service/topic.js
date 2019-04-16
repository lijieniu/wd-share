const Service = require('egg').Service;
const Collection = require('../lib/db/collection');
const moment = require('moment');

class TopicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.collection = new Collection(ctx.db, 'topic');
  }
  async saveTopic(topicInfo) {
    let result;
    if(topicInfo.id) {
      delete topicInfo.create_time;
      let now_date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      topicInfo.update_time = now_date;
      result = await this.collection.update({id: topicInfo.id}, topicInfo);
    } else {
      result = await this.collection.add(topicInfo);
    }
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
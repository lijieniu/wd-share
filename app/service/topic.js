const Service = require('egg').Service;
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
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
  async getTopicList(json) {
    let { topic_username, title, pageSize, pageIndex } = json;
    let query = new Query();
    query.orderByField = 'id';
    query.orderBy = 'desc';
    query.like.title = title;
    query.like.topic_username = topic_username;
    query.pageSize = pageSize;
    query.pageIndex = pageIndex;
    let result = await this.collection.getPager(query);
    return result;
  }
  async deleteTopic(field) {
    let result = await this.collection.delete(field);
  }

  async getTopicById(field) {
    let query = new Query();
    query.where = field;
    let result = await this.collection.query(query);
    return result;
  }
}

module.exports = TopicService;
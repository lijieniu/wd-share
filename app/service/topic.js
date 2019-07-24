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
    let { topic_username, title, pageSize, pageIndex, isMine } = json;
    let query = new Query();
    query.orderByField = 'id';
    query.orderBy = 'desc';
    query.like.title = title;
    query.like.topic_username = topic_username;
    query.pageSize = pageSize;
    query.pageIndex = pageIndex;
    if(isMine) query.where = {topic_username: this.ctx.session.userInfo.username};
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

  async getWeekTwoTopic() {
    let curStartTime = moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
    let curEndTime = moment().endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
    let nextStartTime = moment(curStartTime).add(1, 'w').format('YYYY-MM-DD HH:mm:ss');
    let nextEndTime = moment(curEndTime).add(1, 'w').format('YYYY-MM-DD HH:mm:ss');
    // 获取最新的两条数据当作本周和下周的数据
    const curResult = await this.ctx.app.mysql.query('select * from topic where topic_time >= ? and topic_time <= ?', [curStartTime, curEndTime]);
    const nextResult = await this.ctx.app.mysql.query('select * from topic where topic_time >= ? and topic_time <= ?', [nextStartTime, nextEndTime]);
    let results = {};
    results.currWeekTopic = curResult[0];
    results.nextWeekTopic = nextResult[0];
    return results;
  }
}

module.exports = TopicService;
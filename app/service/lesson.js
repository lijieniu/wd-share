const Service = require('egg').Service;
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
const moment = require('moment');

class LessonService extends Service {
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.collection = new Collection(ctx.db, 'lesson');
    }
    
    async findLessonBySNo(student_no, class_no) {
        let nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        
        let sql = 'select * from user_lesson where lesson_id in (select id from lesson where start_time < ? and end_time > ? and class_no = ?) and student_no = ?'
        let result = await this.ctx.app.mysql.query(sql, [nowDate, nowDate, class_no, student_no]);
        return result.length;
    }
    async findLessonInfoByCNo(class_no) {
        let nowDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        
        let sql = 'select * from lesson where start_time < ? and end_time > ? and class_no = ?'
        let result = await this.ctx.app.mysql.query(sql, [nowDate, nowDate, class_no]);
        return result;
    }
}

module.exports = LessonService;
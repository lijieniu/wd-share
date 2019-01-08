const Service = require('egg').Service;
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');

class SignService extends Service {
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.collection = new Collection(ctx.db, 'signin');
    }
    
    async userSign(student_no, class_num) {
        let hasSign = await this.findBySNo(student_no);
        if(hasSign) {
            return false;
        } else {
            return this.collection.add({student_no});
        }
    }
    async findBySNo(student_no) {
        let query = new Query();
        query.where.student_no = student_no;
        return this.collection.query(query);
    }
}

module.exports = SignService;
const Service = require('egg').Service;
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');

class UserService extends Service {
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.collection = new Collection(ctx.db, 'user');
    }
    async getUserList() {
        const query = new Query();
        query.pageIndex = 1;
        query.pageSize = 10;
        let userList = this.collection.getPager(query);
        return userList;
    }
    async createUser(user) {
        return this.collection.add(user);
    }
    async findUserBySNo(student_no) {
        const query = new Query();
        query.where.student_no = student_no;
        return this.collection.query(query);
    }
    async updateUserBySNo(userInfo) {
        return this.collection.update({student_no: userInfo.student_no}, userInfo);
    }
}

module.exports = UserService;
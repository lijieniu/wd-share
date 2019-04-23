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
    async saveUser(user) {
        return this.collection.add(user);
    }
    async findUserByUsername(username) {
        const query = new Query();
        query.where.username = username;
        return this.collection.query(query);
    }
    async updateUserByUsername(userInfo) {
        return this.collection.update({username: userInfo.username}, userInfo);
    }
}

module.exports = UserService;
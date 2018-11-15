const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
    static get schedule() {
        return {
            interval: '1h', // 1分钟间隔
            type: 'all' // 指定所有的worker都需要执行
        }
    }

    async subscribe() {
        console.log('update-cache');
    }
}

module.exports = UpdateCache;
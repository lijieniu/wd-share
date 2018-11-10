const Service = require('egg').Service;

class HomeService extends Service {
    async list(page = 1) {
        const dataList = {
            list: [
                {id: 1, title: 'li1', time: new Date().getTime()},
                {id: 2, title: 'li2', time: new Date().getTime()},
            ]
        }
        this.ctx.logger.info('dataList: ', dataList);
        return dataList;
    }
}

module.exports = HomeService;
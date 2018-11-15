const Service = require('egg').Service;
let memoryCache = {};
class SourceService extends Service {
    get(key) {
        return memoryCache(key);
    }

    async checkUpdate() {
        const updated = await mockCheck();
        this.ctx.logger.info('check update response %s', updated);
        return updated;
    }

    async update() {
        memoryCache = await mockFetch();
        this.ctx.logger.info('update memory cache from remote: %j', memoryCache);
    }
}

module.exports = SourceService;
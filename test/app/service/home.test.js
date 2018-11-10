const { app, mock, assert } = require('egg-mock/bootstrap');

describe('list()', () => {
    it('should get a list', async () => {
        const ctx = app.mockContext();
        const list = await ctx.service.home.list(1);
        assert(list);
    });
});
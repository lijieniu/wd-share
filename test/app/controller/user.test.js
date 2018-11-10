// const assert = require('assert');
// const mock = require('egg-mock');

// describe('test/controller/user.test.js', () => {
//     let app;
//     before(() => {
//         app = mock.app();
//         return app.ready();
//     });
// });

const { app, mock, assert } = require('egg-mock/bootstrap');
describe('test/controller/user.test.js', () => {
    it('should get a ctx', () => {
        const ctx = app.mockContext({
            user: {
                name: 'niu'
            }
        });
        assert(ctx.method === 'GET');
        assert(ctx.url === '/');
        assert(ctx.user);
        assert(ctx.user.name === 'niu');
    });
});
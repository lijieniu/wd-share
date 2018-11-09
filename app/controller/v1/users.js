const Controller = require('egg').Controller;

exports.index = async (ctx) => {
    ctx.response.body = {
        page: ctx.query.page
    }
}
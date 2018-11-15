exports.schedule = {
    interval: '10m',
    type: 'all'
};

exports.task = async ctx => {
    await ctx.service.source.update();
    ctx.app.lastUpdateBy = 'before';
}
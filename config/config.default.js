exports.keys = 'wd-share';

exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks'
    }
}

exports.middleware = [
    'robot',
    'gzip'
];

exports.robot = {
    ua: [
        /niu/i
    ]
};

exports.gzip = {
    threshold: 1024,
    enable: true,
    match(ctx) {
        const reg = /iphone|ipad|ipod/i;
        return reg.test(ctx.get('user-agent'));
    }
}

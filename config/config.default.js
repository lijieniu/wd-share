const path = require('path');

exports.keys = 'wd-share';

exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks'
    }
}; 

// module.exports = appInfo => {
//     const config = {};
//     config.view = {
//         root: [
//             path.join(appInfo.baseDir, 'app/view')
//         ].join(',')
//     }
//     return config;
// }

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

exports.multipart = {
    mode: 'file',
    // whitelist: ['.doc'] // 覆盖整个白名单
    fileExtensions: ['.doc']
}

// 统一错误处理
exports.onerror = {
    errorPageUrl: '/500.html'
}

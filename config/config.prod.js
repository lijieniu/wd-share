/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = app => {
  const exports = {};

  exports.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'Abc123!_',
      database: 'smartyclass'
    },
    app: true,
    agent: false
  };

  return exports;
};

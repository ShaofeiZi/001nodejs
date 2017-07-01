/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require("./router");

//启动服务器
server.start(router.route);
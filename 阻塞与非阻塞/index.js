/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//从`server`模块中导入server对象

let server = require('./server');
let router = require("./router");
let requestHandlers = require("./requestHandlers");

//对象构造
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

//启动服务器
server.start(router.route, handle);

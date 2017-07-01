/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

//用一个函数将之前的内容包裹起来
let start = () => {
        //箭头函数
    let onRequest = (request, response) => {
        console.log("Request received.");
        response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
        response.write("添加小精灵微信(ershiyidianjian),加入全栈部落");
        response.end();
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
    console.log("请在浏览器中打开 http://127.0.0.1:8888...");
}

//导出`server`对象，对象中包含一个start函数
//对象格式为
/**
 * {
 *    start
 * }
 */

//这个对象导入到其他文件中即可使用，可以用任意的名字来接收这个对象

exports.start = start;
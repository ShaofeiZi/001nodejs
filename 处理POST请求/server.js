/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量。
let http = require("http");

let url = require("url");

//用一个函数将之前的内容包裹起来
let start = (route,handle) => {
        //箭头函数
    let onRequest = (request, response) => {
        
        let postData = "";
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+ postDataChunk + "'.");
        });

        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
    }
    //把函数当作参数传递
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
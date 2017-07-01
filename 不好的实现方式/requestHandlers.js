/**
 * 从零到壹全栈部落，添加小精灵微信(ershiyidianjian)
 */

function start() {
  console.log("Request handler 'start' was called.");
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;


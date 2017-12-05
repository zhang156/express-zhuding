/*
*
* 七牛控制器
*
*/

const qiniu = require('qn');
const config = require('../ep-config');
const client = qiniu.create(config.QINIU);
const { handleRequest } = require('../ep-utils/ep-handle.js');
const qiniuCtrl = {};

// 获取配置列表
qiniuCtrl.GET = (req, res) => {
	res.jsonp({ uptoken: client.uploadToken() });
}

module.exports = (req, res) => { handleRequest( req, res, qiniuCtrl )};

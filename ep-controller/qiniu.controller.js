/*
*
* 七牛控制器
*
*/

const qiniu = require('qiniu');
const config = require('../ep-config');
const { handleRequest, handleError, handleSuccess } = require('../ep-utils/ep-handle.js');
const qiniuCtrl = {};

const mac = new qiniu.auth.digest.Mac(config.QINIU.accessKey, config.QINIU.secretKey)
const putPolicy = new qiniu.rs.PutPolicy({
	scope: config.QINIU.bucket
	// returnBody: {"key":"$(key)", "hash":"$(etag)", "fsize":$(fsize), "bucket":"$(bucket)", "name":"$(x:name)"}
})

var qn_upload_config = new qiniu.conf.Config()
// 设置对应机房（华东）
qn_upload_config.zone = qiniu.zone.Zone_z0

// 获取配置列表
qiniuCtrl.GET = (req, res) => {
	res.jsonp({ uptoken: putPolicy.uploadToken(mac) });
}

// 文件上传
qiniuCtrl.POST = (req, res) => {
	var file = req.file
	// fieldname originalname encoding mimetype buffer size
	if (file) {
		var formUploader = new qiniu.form_up.FormUploader(qn_upload_config)
		var putExtra = new qiniu.form_up.PutExtra()
		var token = putPolicy.uploadToken(mac)

		formUploader.put(token, file.originalname, file.buffer, putExtra, (respErr, respBody, respInfo) => {
			if (respInfo.statusCode == 200) {
				handleSuccess({ res, message: '上传文件成功', result: respBody })
			} else {
				handleError({ res, message: `上传${respInfo.statusCode}`, err: respBody })
			}
		})
	} else {
		handleError({ res, message: '内容不合法' })
	}
}

exports.token = (req, res) => { 
	handleRequest( req, res, qiniuCtrl )
};

exports.upload = (req, res) => {
	handleRequest( req, res, qiniuCtrl )
}

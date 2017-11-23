var {handleRequest, handleError, handleSuccess} = require('../ep-utils/ep-handle')
var Tag = require('../ep-model/tag.model')
var tagCtrl = {list: {}}

tagCtrl.list.GET = (req, res) => {
  Tag.find({}).then(result => {
    handleSuccess({ res, message: '标签获取成功', result })
  }).catch(err => {
    handleError({ res, message: '标签获取失败', err })
  })
}

exports.list = (req, res) => {
  handleRequest(req, res, tagCtrl.list)
}
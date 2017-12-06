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

tagCtrl.list.post = (req, res) => {
  var tag = req.body
  if (!tag.name) {
    handleError({ res, message: '内容不合法', err })
  } else {
    new Tag(tag).save().then(result => {
			handleSuccess({res, result, message: '标签新建成功'})
		}).catch(err => {
			handleError({res, message: '标签新建失败', err})
		})
  }
}

exports.list = (req, res) => {
  handleRequest(req, res, tagCtrl.list)
}
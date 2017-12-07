var {handleRequest, handleError, handleSuccess} = require('../ep-utils/ep-handle')
var Category = require('../ep-model/category.model')
var categoryCtrl = {list: {}}

categoryCtrl.list.GET = (req, res) => {
  Category.find({}).then(result => {
    handleSuccess({ res, message: '类别获取成功', result })
  }).catch(err => {
    handleError({ res, message: '类别获取失败', err })
  })
}

categoryCtrl.list.POST = (req, res) => {
  var data = req.body
  if (!data.name) {
    handleError({ res, message: '内容不合法' })
  } else {
    new Category(data).save().then(result => {
      handleSuccess({ res, message: '新增类别成功', result })
    }).catch(err => {
      handleError({ res, message: '新增类别失败', err })
    }) 
  }
}

exports.list = (req, res) => {
  handleRequest(req, res, categoryCtrl.list)
}
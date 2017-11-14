var {handleRequest} = require('../ep-utils/ep-handle')
var articleCtrl = {list: {}, item: {}}

articleCtrl.list.GET = (req, res) => {
    res.json({article: [1,2,3]})
}

exports.list = (req, res) => {
    handleRequest(req, res, articleCtrl.list);
}
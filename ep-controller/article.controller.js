var {handleRequest, handleError, handleSuccess} = require('../ep-utils/ep-handle')
var Article = require('../ep-model/article.model')
var articleCtrl = {list: {}, item: {}}

articleCtrl.list.GET = (req, res) => {
    var { page, per_page } = req.query

    // 过滤条件
	const options = {
		sort: { _id: -1 },
		page: Number(page || 1),
		limit: Number(per_page || 10)
    }
    
    // 查询参数
    let querys = {};
    
    // 请求对应文章
	const getArticles = () => {
		Article.paginate(querys, options)
		.then(articles => {
            console.log(articles)
			handleSuccess({
				res,
				message: '文章列表获取成功',
				result: {
					pagination: {
						total: articles.total,
						current_page: articles.page,
						total_page: articles.pages,
						per_page: articles.limit
					},
					data: articles.docs
				}
			})
		})
		.catch(err => {
			handleError({ res, err, message: '文章列表获取失败' });
		})
    };
    
    getArticles()
}

exports.list = (req, res) => {
    handleRequest(req, res, articleCtrl.list);
}
var {handleRequest, handleError, handleSuccess} = require('../ep-utils/ep-handle')
var Article = require('../ep-model/article.model')
var articleCtrl = {list: {}, item: {}}

// 获取文章列表
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

// 获取文章内容
articleCtrl.item.GET = (req, res) => {
	var article_id = req.params.article_id

	// 判断参数是否正常
	var isId = !!article_id && !Object.is(Number(article_id), NaN)

	// find
	Article.findOne({id: Number(article_id), public: 1, state: 1}).exec()
	.then(result => {
		if (isId) {
			result.meta.views += 1
			Article.update(result, (err, doc) => {
				if (err) {
					handleError({res, err, message: '阅读次数增加失败'})
				}
			})
		}
		handleSuccess({
			res,
			message: '文章内容获取成功',
			result: result
		})
	})
	.catch(err => {
		handleError({res, err, message: '文章获取失败'})
	})
}

const tmp = () => {
	var updateStr = '    '+
	"function fib(n) {\
		var a = 1, b = 1;\
		var tmp;\
		while (--n >= 0) {\
			tmp = a;\
			a += b;\
		   	b = tmp;\
		}\
		return a;\
	}"
	Article.findOneAndUpdate({id: 0}, {content: updateStr}, (err, doc) => {
		if (err) {
			handleError({ message: '文章内容修改失败'})
		}
	})
}
// tmp()

exports.list = (req, res) => {
    handleRequest(req, res, articleCtrl.list);
}

exports.item = (req, res) => {
	handleRequest(req, res, articleCtrl.item);
}
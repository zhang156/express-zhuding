var {handleRequest, handleError, handleSuccess} = require('../ep-utils/ep-handle')
var Article = require('../ep-model/article.model')
var articleCtrl = {list: {}, hotlist:{}, item: {}}

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
		Article.paginate(querys, options).then(articles => {
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
		}).catch(err => {
			handleError({ res, err, message: '文章列表获取失败' });
		})
  }
    
  getArticles()
}

articleCtrl.list.POST = (req, res) => {
	var article = req.body
	// console.log(article)
	if (!article.title || !article.content) {
		handleError({res, message: '内容不合法'})
	} else {
		new Article(article).save().then(result => {
			handleSuccess({res, result, message: '文章发布成功'})
		}).catch(err => {
			handleError({res, message: '文章保存失败', err})
		})
	}
}

// 获取热门文章列表
articleCtrl.hotlist.GET = (req, res) => {
	var { page, per_page } = req.query
	
	// 过滤条件
	const options = {
		sort: { 'meta.views': -1, 'meta.likes': -1 },
		page: Number(page || 1),
		limit: Number(per_page || 10)
	}

	// 查询参数
	let querys = {};
	
	Article.paginate(querys, options).then(hotArticle => {
		handleSuccess({
			res, 
			message: '热门文章获取成功', 
			result: {
				pagination: {
					total: hotArticle.total,
					current_page: hotArticle.page,
					total_page: hotArticle.pages,
					per_page: hotArticle.limit
				},
				data: hotArticle.docs
			}
		})
	})

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
			Article.update(result)
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
    handleRequest(req, res, articleCtrl.list)
}

exports.hotlist = (req, res) => {
	handleRequest(req, res, articleCtrl.hotlist)
}

exports.item = (req, res) => {
	handleRequest(req, res, articleCtrl.item)
}
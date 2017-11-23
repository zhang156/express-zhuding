var config = require('./ep-config')
var controller = require('./ep-controller')

module.exports = app => {

    // 拦截器
    app.all('*', (req, res, next) => {
        // 配置允许跨域
        const allowedOrigins = ['https://zhuding.xyz', 'https://admin.zhuding.xyz'];
		const origin = req.headers.origin || '';
		console.log(origin)
		if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
			res.setHeader('Access-Control-Allow-Origin', origin);
		};
		res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
		res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
		res.header('Access-Control-Max-Age', '1728000');
		res.header('Content-Type', 'application/json;charset=utf-8');
		res.header('X-Powered-By', 'Nodepress 1.0.0');

		// OPTIONS
		if (req.method == 'OPTIONS') {
			res.sendStatus(200);
			return false;
		};

        next();
    })

    // 获取文章列表
	app.all('/article', controller.article.list)
	// 获取热门文章
	app.all('/hotArticle', controller.article.hotlist)
	// 获取文章内容
	app.all('/article/:article_id',controller.article.item)

	// 获取标签
	app.all('/tags', controller.tag.list)

	//获取类别
	app.all('/category', controller.category.list)
}
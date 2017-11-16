var config = require('./ep-config')
var controller = require('./ep-controller')

module.exports = app => {

    // 拦截器
    app.all('*', (req, res, next) => {
        // 配置允许跨域
        const allowedOrigins = ['https://zhuding.xyz', 'https://admin.zhuding.xyz'];
		const origin = req.headers.origin || '';
		if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
			res.setHeader('Access-Control-Allow-Origin', origin);
		};
		res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
		res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
		res.header('Access-Control-Max-Age', '1728000');
		res.header('Content-Type', 'application/json;charset=utf-8');
		res.header('X-Powered-By', 'Nodepress 1.0.0');

        next();
    })

    // 获取文章列表
	app.get('/article', controller.article.list)
	
	// 获取文章内容
	app.get('/article/:article_id',controller.article.item)
}
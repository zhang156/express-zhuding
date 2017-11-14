var config = require('./ep-config')
var controller = require('./ep-controller')

module.exports = app => {

    // 拦截器
    app.all('*', (req, res, next) => {
        next();
    })

    // 获取文章列表
    app.get('/article', controller.articles.list)
}
// 数据库模块

const mongoose = require('mongoose')
const config = require('./ep-config')
mongoose.Promise = global.Promise

exports.mongoose = mongoose

exports.connect = () => {
    // 连接数据库
    mongoose.connect(config.MONGODB.uri)

    mongoose.connection.on('error', error => {
        console.log(`数据库连接失败${error}`)
    })

    mongoose.connection.on('open', () => {
        console.log('数据库连接成功')
    })
}

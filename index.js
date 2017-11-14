var express = require('express')
var config = require('./ep-config')
var mongodb = require('./ep-mongodb')
var routes = require('./ep-routes')

var app = express()

// mongodb
mongodb.connect()

// routes
routes(app)

let port = config.APP.port
app.listen(port, () => {
    console.log(`express-zhuding start at ${port}!`)
})
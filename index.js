const express = require('express')
const config = require('./ep-config')
const mongodb = require('./ep-mongodb')
const routes = require('./ep-routes')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoosePaginate = require('mongoose-paginate');

const app = express()

// mongodb
mongodb.connect()

// global options
mongoosePaginate.paginate.options = {
	limit: config.APP.LIMIT
};

app.use(helmet());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
routes(app)

app.listen(config.APP.port, () => {
    console.log(`express-zhuding start at ${config.APP.port}!`)
})
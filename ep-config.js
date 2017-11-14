const argv = require('yargs').argv;

exports.APP = {
    port: argv.appPort || '8000'    
}

exports.MONGODB = {
	uri: `mongodb://66.55.159.180:${argv.dbport || '27017'}/test`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password'
}
const argv = require('yargs').argv;

exports.APP = {
    port: argv.appPort || '8000'    
}

exports.MONGODB = {
	uri: `mongodb://${argv.db_username}:${argv.db_password }@66.55.159.180:${argv.dbport || '27017'}/express-zhuding`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password'
}

exports.QINIU = {
	accessKey: argv.qn_accessKey || 'rLccHXXrF7DjH6sPY11BSXANzh6e2j50ErRT4Wic',
	secretKey: argv.qn_secretKey || 'E2BNqRbGmNVJvuglcNUVD6zMy8I1gBKKku1Pv-zD',
	bucket: argv.qn_bucket || 'picture',
	origin: argv.qn_origin || 'http://picture.qiniudn.com',
	uploadURL: argv.qn_uploadURL || 'http://up.qiniu.com/'
}

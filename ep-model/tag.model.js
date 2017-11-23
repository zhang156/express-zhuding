var { mongoose } =  require('../ep-mongodb')
var autoIncrement = require('mongoose-auto-increment')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection);

var tagSchema = new mongoose.Schema({
  name: {type: String, required: true, validate: /\S+/}
})

tagSchema.set('toObject', { getters: true });

tagSchema.plugin(autoIncrement.plugin, {
	model: 'Tag',
	field: 'id',
	startAt: 1,
	incrementBy: 1
});

module.exports = mongoose.model('Tag', tagSchema)
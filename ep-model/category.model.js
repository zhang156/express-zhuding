var { mongoose } =  require('../ep-mongodb')
var autoIncrement = require('mongoose-auto-increment')

// 自增ID初始化
autoIncrement.initialize(mongoose.connection);

var categorySchema = new mongoose.Schema({
  name: {type: String, required: true, validate: /\S+/}
})

categorySchema.set('toObject', { getters: true });

categorySchema.plugin(autoIncrement.plugin, {
	model: 'Category',
	field: 'id',
	startAt: 1,
	incrementBy: 1
});

module.exports = mongoose.model('Category', categorySchema)
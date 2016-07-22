var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Article', ArticleSchema);


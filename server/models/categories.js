const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    title: String,
    image: String,
});

module.exports = mongoose.model('Categories', CategoriesSchema);
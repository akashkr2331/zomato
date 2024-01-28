const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    image: String,
    category: String,
    restaurant:String,
    desc:String,
    price:Number

});

module.exports = mongoose.model('item', ItemSchema);
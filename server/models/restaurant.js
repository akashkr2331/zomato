const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('restaurant', RestaurantSchema);
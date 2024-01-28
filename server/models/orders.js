const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    customer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item:{
        type: Schema.Types.ObjectId,
        ref: 'item'
    },
    quantity: Number,
    amount: Number,
    status: String,
    placedAt: String,
    acceptedAt:String,
    deliveredAt:String,
});


module.exports = mongoose.model('Order', OrderSchema);
const Restaurant=require("../models/restaurant")
const Items=require("../models/items")
const Order=require("../models/orders")
const User=require("../models/user")
const category=require("../models/categories")

module.exports.getRestaurants=async(req,res)=>{
    try{
        const restaurants=await Restaurant.find({});
    res.status(200).json(restaurants);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.getCategories=async(req,res)=>{
    try{
        const categories=await category.find({});
    res.status(200).json(categories);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }

}

module.exports.getRestaurantDetails=async(req,res)=>{
    try{
        const {id}=req.params;
        // console.log(id);
        const items=await Items.find({restaurant:id});
    res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.getCategoryDetails=async(req,res)=>{
    try{
        const {id}=req.params;
        const items=await Items.find({category:id});
    res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.getItemDetail=async(req,res)=>{
    try{
        const {id}=req.params;
        const item=await Items.findById(id);
        if(item)
    res.status(200).json(item);
else{
    res.status(200).json("null");
}
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.getRestaurantName=async(req,res)=>{
    try{
        const {id}=req.params;
        const item=await Restaurant.findById(id);
    res.status(200).json(item.username);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.takeOrder=async(req,res)=>{
    try{
        console.log(req.body);
        const {
    quantity,
    amount,
    resId,
    userId, 
    itemId,
    status
        }=req.body;

        const restaurant=await Restaurant.findById(resId);
        const customer=await User.findById(userId);
        const item=await Items.findById(itemId)
        var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
        const order=new Order({
            restaurant,
            customer,
            quantity,
            amount,
            status,
            item,
            placedAt:dateTime
            });
            const savedOrder=await order.save()
        res.status(200).json(savedOrder); 
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.cancelOrder=async(req,res)=>{
    try{
        const {id}=req.params;
        const order=await Order.findByIdAndUpdate(id,{status:"cancelled"});
        res.status(200).json(order); 
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.deliverOrder=async(req,res)=>{
    try{
        const {id}=req.params;
        var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
        const order=await Order.findByIdAndUpdate(id,{status:"delivered",deliveredAt:dateTime});
        console.log(order)
        res.status(200).json(order); 
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

module.exports.getPastOrders=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const orders=await Order.find({customer:id, $or: [{ status: 'cancelled' }, { status: 'delivered' }]   }).populate({
            path: 'restaurant'
        }).populate({
            path: 'customer'
        }).populate({
            path: 'item'
        });
        console.log(orders);
    res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}


module.exports.getCurrOrders=async(req,res)=>{
    try {
      const { id } = req.params;
    //   console.log(id)
      const orders= await Order.find({ customer: id, $or: [{ status: 'processing' }, { status: 'accepted' }]}).populate({
        path: 'restaurant'
    }).populate({
        path: 'customer'
    }).populate({
        path: 'item'
    });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  
  
const Restaurant=require("../models/restaurant")
const cloudinary = require("cloudinary").v2;
const bcrypt =require("bcrypt");
const Items=require("../models/items")
const Order=require("../models/orders")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }
  

module.exports.addRestaurant=async(req,res)=>{
    
    const {name,address,email,password}=req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const restaurant = new Restaurant({ username:name,address,password:passwordHash,email,image:cldRes.url});
    // console.log(restaurant);
        const registeredRestaurant = await restaurant.save();
    res.status(200).json(registeredRestaurant);
}

module.exports.login=async(req,res)=>{
    
  try {
    const { email, password } = req.body;
    const restaurant = await Restaurant.findOne({ email: email });
    if (!restaurant) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.profile=async(req,res)=>{
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);    ;
    if (!restaurant) return res.status(400).json({ msg: "User does not exist. " });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.items=async(req,res)=>{
  try {
    // const { id } = req.params;
    // console.log(req)
    console.log(req.body);
    const {name,desc,category,restaurant,price}=req.body;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    const item=new Items({name,desc,category,restaurant,price:parseFloat(price),image:cldRes.url})
    // console.log(item);
    const saveditem = await item.save();
    
    res.status(200).json("saveditem");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.removeitem=async(req,res)=>{
  try {
    const { id } = req.params;
    // console.log(id);
    await Items.findByIdAndDelete(id);
    
    res.status(200).json("saccessfullyy deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.getitems=async(req,res)=>{
  try {
    const { id } = req.params;
    // console.log(id)
    const items= await Items.find({ restaurant: id })
    res.status(200).json(items);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.getPastOrders=async(req,res)=>{
  try {
    const { id } = req.params;
    // console.log(id){ $or: [{ status: 'delivered' }, { status: 'Accepted' }] }
    const orders= await Order.find({ restaurant: id, $or: [{ status: 'delivered' }, { status: 'cancelled' }]}).populate({
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


module.exports.getCurrOrders=async(req,res)=>{
  try {
    const { id } = req.params;
    // console.log(id){ $or: [{ status: 'delivered' }, { status: 'Accepted' }] }
    const orders= await Order.find({ restaurant: id, $or: [{ status: 'processing' }, { status: 'accepted' }]}).populate({
      path: 'restaurant'
  }).populate({
      path: 'customer'
  }).populate({
      path: 'item'
  });
  // console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.cancelOrders=async(req,res)=>{
  try {
    const { id } = req.params;
    const order=await Order.findByIdAndUpdate(id,{status:"cancelled"});
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.acceptOrders=async(req,res)=>{
  try {
    const { id } = req.params;
    var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
    const order=await Order.findByIdAndUpdate(id,{status:"accepted",acceptedAt:dateTime});
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



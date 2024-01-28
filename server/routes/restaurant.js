const express=require("express");
const router=express.Router();
const restaurant=require('../controllers/restaurant')
const Multer = require("multer");
const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
  });
  
router.route('/').post(upload.single("my_file"),restaurant.addRestaurant);
router.route('/login').post(restaurant.login)
router.route('/profile/:id').get(restaurant.profile)
router.route('/additems').post(upload.single("my_file"),restaurant.items);
router.route('/getitems/:id').get(restaurant.getitems)
router.route('/pastorders/:id').get(restaurant.getPastOrders)
router.route('/currorders/:id').get(restaurant.getCurrOrders)
router.route('/cancelOrder/:id').get(restaurant.cancelOrders)
router.route('/acceptOrder/:id').get(restaurant.acceptOrders)
router.route('/deleteItem/:id').delete(restaurant.removeitem)
// http://localhost:4000/customer/deleteItem/65a79ec0b331d45f5e92d943
module.exports=router;

const express=require("express");
const router=express.Router();
const customer=require('../controllers/customer')

router.route('/getRestaurants').get(customer.getRestaurants)
router.route('/getCategories').get(customer.getCategories)
router.route('/restaurant/:id').get(customer.getRestaurantDetails)
router.route('/category/:id').get(customer.getCategoryDetails)
router.route('/item/:id').get(customer.getItemDetail)
router.route('/restaurantName/:id').get(customer.getRestaurantName)
router.route('/order').post(customer.takeOrder);
router.route('/history/:id').get(customer.getPastOrders)
router.route('/current/:id').get(customer.getCurrOrders)
router.route('/deliverOrder/:id').get(customer.deliverOrder)
router.route('/cancelOrder/:id').get(customer.cancelOrder)

module.exports=router;
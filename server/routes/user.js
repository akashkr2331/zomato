const express=require("express");
const router=express.Router();
const user=require("../controllers/user")

router.route('/signup').post(user.register);
router.route('/login').post(user.login);
router.route('/getemail/:id').get(user.getemail);

module.exports=router;
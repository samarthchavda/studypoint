const razorPay=require('razorpay');
require('dotenv').config();
const instance=new razorPay({
    key_id:process.env.RAZOR_KEY,
    key_secret:process.env.
    RAZOR_SECRET 
})
exports.module=instance;
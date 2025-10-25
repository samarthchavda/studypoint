const { auth,isStudent } = require('../middlewares/auth');
const { capturePayment, verifySignatureAndEnrollStudent } = require('../controllers/payment');
const  express  = require('express');
const router=express.Router();
router.post('/capturePayment',auth,isStudent,capturePayment);
router.post('/verifySignatureEnrollStudent',verifySignatureAndEnrollStudent);

module.exports=router;
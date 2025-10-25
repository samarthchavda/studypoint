const { changePassword } = require('../controllers/auth');
const { getInstructorCourses } = require('../controllers/courseCon');
const { getUserDetails, updateProfile, deleteAccount, updateDisplayPicture, getEnrolledCourses, getInstructorDashInfo } = require('../controllers/profileCon');
const { auth, isInstructor, isStudent } = require('../middlewares/auth');
    
const  express  = require('express');
const router=express.Router();
router.get('/getUserDetails',auth,getUserDetails);
router.put('/updateProfile',auth,updateProfile);
router.delete('/deleteAccount',auth,isStudent,deleteAccount);
router.put('/updateDP',auth,updateDisplayPicture);
router.get('/getEnrolledCourses',auth,isStudent,getEnrolledCourses);
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
router.post('/changePassword',auth,changePassword);
router.get('/instructorDashboardInfo',auth,isInstructor,getInstructorDashInfo);

module.exports=router;  
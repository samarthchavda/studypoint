const User = require("../models/User");
const Course = require("../models/Course");
const crypto = require("crypto");
const razorpay = require("razorpay");
const { default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender");
const CourseProgress = require("../models/CourseProgress");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");

exports.capturePayment = async (req, res) => {
  //fetch needed data
  const instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  const { courses } = req.body;
  const userId = req.user.id;
  if (courses?.length == 0 || !userId) {
    return res.status(400).json({
      success: false,
      message: "courseid and userid is required",
    });
  }
  let user;
  let course;
  let totalAmount = 0;
  try {
    user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "no user found",
      });
    }
    for (const course of courses) {
      const courseFound = await Course.findById(course);
      if (!courseFound) {
        return res.status(400).json({
          success: false,
          message: `${course} no such course found`,
        });
      }
      //if user has already purchased the course
      // const uid = new mongoose.Types.ObjectId(userId);
      if (courseFound.studentsEnrolled.includes(userId)) {
        return res.status(400).json({
          success: false,
          message: "student has already purchased the course",
        });
      }
      totalAmount += courseFound.price;
    }
  } catch (error) {
    console.log("error while fetching data", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  //create order, intitate razorpay payment
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
    notes: {
      userId,
      courses,
    },
  };
  try {
    // let orderId, currency, amount;
    instance.orders.create(options, (err, order) => {
      return res.status(200).json({
        success: true,
        order,
      });
    });
    // const order = {
    //   orderId,
    //   currency,
    //   amount,
    // };
    // console.log(order,"in captre patue controlelr");
    // //return response
    // return res.status(200).json({
    //   success: true,
    //   order
    // });
  } catch (error) {
    console.log("eror while initiating payment", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const fetchCoursesName=(courses)=>{
  console.log(courses);
  const names=courses.map((course)=>course.name);
  const stringNames=names.join();
  console.log(stringNames);
  return stringNames;
}
//verify signature of razorpay and server
exports.verifySignatureAndEnrollStudent = async (req, res) => {
  // const webHookSecret = process.env.WEBHOOKSECRET;
  // const razorpaySignature = req.headers["x-razorpay-signature"];
  // const shaSum = crypto.createHmac("sha256", webHookSecret);
  // shaSum.update(JSON.stringify(req.body));
  // const digest = shaSum.digest("hex");
  const {
    razorpay_signature,
    razorpay_order_id,
    razorpay_payment_id,
    courses,
    userId,
  } = req.body;
  if (!razorpay_order_id || !razorpay_signature || !razorpay_payment_id) {
    return res.status(200).json({
      success: false,
      message: "payment faild , some fields are missing",
    });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (razorpay_signature === expectedSignature) {
    //fullfill the action
    let enrolledStudent;
    let enrolledCourses=[];
    try {
      for (const course of courses) {
        const enrolledCourse = await Course.findByIdAndUpdate(
          course,
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );
        const courseProgess = {
          userId: userId,
          courseId: course,
        };
        enrolledCourses.push(enrolledCourse);
        const courseProgressObject = await CourseProgress.create(courseProgess);

        enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: course,
              courseProgress: courseProgressObject._id,
            },
          },
          { new: true }
        );

        console.log(courseProgressObject);
      }
    } catch (error) {
      console.log("error while updating database", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const enrollEmail = await mailSender(
      enrolledStudent.email,
     `Successfully Enrolled into ${fetchCoursesName(enrolledCourses)}`,
            courseEnrollmentEmail(fetchCoursesName(enrolledCourses), `${enrolledStudent.firstName}`  ));
    // console.log("sab bhumi gopal ki");
    return res.status(200).json({
      success: true,
      message: "verification successfull and course added",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "invalid request",
    });
  }
};

// exports.capturePayment=async (req,res)=>{
//     //fetch needed data
//     const {courseId}=req.body;
//     const userId=req.user.id;
//     if(!courseId||!userId){
//          return res.status(400).json({
//              success:false,
//              message:"courseid and userid is required"
//         });
//     };
//     let user;
//     let course;
//     try {
//          user=await User.findById(userId);
//          course=await Course.findById(courseId);
//         if(!course){
//              return res.status(400).json({
//                  success:false,
//                  message:"no such course found"
//             });
//         }
//         if(!user){
//              return res.status(400).json({
//                  success:false,
//                  message:"no user found"
//             });
//         };
//         //check for user and is student alreay purchased course
//         const uid=mongoose.Schema.Types.ObjectId(userId);
//         if(Course.studentsEnrolled.includes(uid)){
//              return res.status(400).json({
//                  success:false,
//                  message:"student has already purchased the course"
//             });
//         }
//     } catch (error) {
//         console.log('error while fetching data', error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }

//     //create order, intitate razorpay payment
//     const options={
//         amount:course.price*100,
//         currency:"INR",
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             userId,
//             courseId
//         }
//     }
//     try {
//         const paymentResponse=await instance.create(options,(err,order)=>{
//             console.log(order);
//         });

//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     } catch (error) {
//         console.log('eror while initiating payment', error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }

// }

// exports.verifySignature = async (req, res) => {
//   const webHookSecret = process.env.WEBHOOKSECRET;
//   const razorpaySignature = req.headers["x-razorpay-signature"];
//   const shaSum = crypto.createHmac("sha256", webHookSecret);
//   shaSum.update(JSON.stringify(req.body));
//   const digest = shaSum.digest("hex");

//   if (razorpaySignature === digest) {
//     console.log("payment is authorized");
//     //fullfill the action
//     try {
//       const { userId, courseId } = req.body.payload.payment.entity.notes;
//       const enrolledCourse = await Course.findyByIdAndUpdate(
//         courseId,
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       );
//       const enrolledStudent = await User.findyByIdAndUpdate(
//         userId,
//         { $push: { courses: courseId } },
//         { new: true }
//       );
//     } catch (error) {
//       console.log("error while updating database", error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     const enrollEmail = await mailSender(
//       enrolledStudent.email,
//       "enrollment successfull",
//       "let's begin new journey"
//     );
//     return res.status(200).json({
//       success: true,
//       message: "verification successfull and course added",
//     });
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "invalid request",
//     });
//   }
// };

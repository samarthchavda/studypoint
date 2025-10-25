const { default: mongoose } = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { imageUpload } = require("../utils/cloudinaryUpload");
const Course = require("../models/Course");
require("dotenv").config();
exports.updateProfile = async (req, res) => {
  try {
    const { dob = "", about = "", phoneNumber, gender, countryCode } = req.body;
    //    if(!gender||!phoneNumber){
    //      return res.status(400).json({
    //          success:false,
    //          message:"gender and phoneNumber fields are required"
    //     });
    //    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    const profileId = user.additionalDetails;
    const profile = await Profile.findById(profileId);
    if (about) {
      profile.about = about;
    }
    if (dob) {
      profile.dob = dob;
    }
    if (phoneNumber) {
      profile.phoneNumber = phoneNumber;
    }
    if (gender) {
      profile.gender = gender;
    }
    if (countryCode) {
      profile.countryCode = countryCode;
    }
    await profile.save();
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      profile,
    });
  } catch (error) {
    console.log("error while updating profile", error);
    return res.status(500).json({
      success: false,
      message: "failure in updating profile",
    });
  }
};

// exports.deleteAccount = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userIdObjectId=new mongoose.Types.ObjectId(userId)
//     // const account = await User.findByIdAndDelete(userId);
//     const removeFromCourses=await Course.aggregate([{
//       $match:{studentsEnrolled:{$in:[userIdObjectId]}}
//     }
//   ]);
//   const crs=removeFromCourses.map((course)=>{
//     const newStudents=course.studentsEnrolled.filter((student)=>student!=userId);
//     return {
//       ...course,
//       studentsEnrolled:newStudents
//     }
//   })

//   console.log(crs);

//     // if (!account) {
//     //   return res.status(404).json({
//     //     success: false,
//     //     message: "no account found",
//     //   });
//     // }
//     //do i need to remove user from other documetns entries?
//     return res.status(200).json({
//       success: true,
//       message: "account deleted successfully",
//     });
//   } catch (error) {
//     console.log("error while deleting profile", error);
//     return res.status(500).json({
//       success: false,
//       message: "failure in deleting profile",
//     });
//   }
// };

exports.deleteAccount = async (req, res) => {
  let session;
  try {
    const userId = req.user.id;
    const userIdObjectId = new mongoose.Types.ObjectId(userId);

    session = await mongoose.startSession({
      defaultTransactionOptions: {
        readConcern: { level: "snapshot" },
        writeConcern: { w: "majority" },
        maxTimeMS: 30000,
      },
    });

    const result = await session.withTransaction(
      async () => {
        const coursesToUpdate = await Course.find({
          studentsEnrolled: userIdObjectId,
        }).session(session);

        if (coursesToUpdate.length > 0) {
          await Course.bulkWrite(
            coursesToUpdate.map((course) => ({
              updateOne: {
                filter: { _id: course._id },
                update: { $pull: { studentsEnrolled: userIdObjectId } },
              },
            })),
            { session }
          );
        }

        await Promise.all([
          CourseProgress.deleteMany({ userId: userIdObjectId }, { session }),
          Profile.findByIdAndDelete(
            (
              await User.findById(userId).select("additionalDetails")
            ).additionalDetails,
            { session }
          ),
          User.findByIdAndDelete(userId, { session }),
        ]);

        return true;
      },
      {
        maxTimeMS: 30000,
      }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Account and related data deleted successfully",
      });
    } else {
      throw new Error("Transaction failed");
    }
  } catch (error) {
    console.log("Error while deleting profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("error while getting user details", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const { displayPicture } = req.files;
    // console.log("display pic",displayPicture);
    const userId = req.user.id;
    const dpCloudinary = await imageUpload(
      displayPicture,
      process.env.FOLDERNAME
    );
    // console.log("dpcloudinary",dpCloudinary);
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: dpCloudinary.secure_url },
      { new: true }
    );
    // console.log("updated profile",updatedProfile);
    return res.status(200).json({
      success: true,
      message: "display picture is updated successfully",
      url: dpCloudinary.secure_url,
    });
  } catch (error) {
    console.log("error while updating the dp", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrlCourses = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          courses: 1,
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courses",
        },
      },
      {
        $lookup: {
          from: "sections",
          localField: "courses.courseContent",
          foreignField: "_id",
          as: "sections",
        },
      },
      {
        $lookup: {
          from: "subsections",
          localField: "sections.subSections",
          foreignField: "_id",
          as: "subSections",
        },
      },
      {
        $unwind: {
          path: "$subSections",
        },
      },
      {
        $group: {
          _id: "$subSections.courseId",
          totalDuration: {
            $sum: "$subSections.timeDuration",
          },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: {
          path: "$course",
        },
      },
      {
        $project: {
          "course._id": 1,
          "course.name": 1,
          "course.description": 1,
          "course.thumbnail": 1,
          totalDuration: 1,
        },
      },
    ]);
    const courseProgress = await CourseProgress.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $lookup: {
          from: "sections",
          localField: "result.courseContent",
          foreignField: "_id",
          as: "resultSections",
        },
      },
      {
        $unwind: {
          path: "$resultSections",
        },
      },
      {
        $group: {
          _id: "$courseId",
          courseId: { $first: "$courseId" },
          completedVideos: { $first: "$completedVideos" },
          totalVideos: {
            $sum: { $size: "$resultSections.subSections" },
          },
        },
      },
      {
        $project: {
          courseId: 1,
          completedVideos: { $size: "$completedVideos" },
          totalVideos: 1,
        },
      },
    ]);
    console.log(enrlCourses);
    console.log(courseProgress);
    // const courses=enrlCourses.map((course)=>{
    //     const cp=courseProgress.filter((courseP)=>courseP.courseId==course.course._id)[0];
    // })

    const newCourses = enrlCourses.map((course) => {
      const cp = courseProgress.filter(
        (courseP) =>
          courseP.courseId.toString() === course.course._id.toString()
      )[0];
      // console.log(cp,"cp");
      const coursePercentage = Math.round(
        (cp?.completedVideos / cp?.totalVideos) * 100
      );
      return {
        ...course.course,
        totalDuration: course.totalDuration,
        courseProgress: {
          ...cp,
        },
        coursePercentage,
      };
    });

    console.log(newCourses);

    if (!enrlCourses) {
      return res.status(404).json({
        success: false,
        message: "no user with that user id",
      });
    }
    // if (enrlCourses.length == 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "you have not enrolled in any courses",
    //   });
    // }
    return res.status(200).json({
      success: true,
      message: "enrolled courses fetched successfully",
      enrolledCourses: newCourses,
    });
  } catch (error) {
    console.log("error while fetching enrolled courses data", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorDashInfo = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const instructorObjectId = new mongoose.Types.ObjectId(instructorId);
    const courses = await Course.find({ instructor: instructorObjectId });
    if (courses) {
      const modifiedCourses = courses?.map((course) => {
        let stdEnrolled = course.studentsEnrolled.length;
        let income = stdEnrolled * course.price;
        return {
          name: course.name,
          thumbnail: course.thumbnail,
          price: course.price,
          noOfStudents: stdEnrolled,
          courseIncome: income,
        };
      });
      return res.status(200).json({
        success: true,
        courses: modifiedCourses,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "failure at our side",
      });
    }
  } catch (error) {
    console.log("error in getInstructorDashinfo controller", error);
    return res.stats(500).json({
      success: false,
      message: error.message,
    });
  }
};

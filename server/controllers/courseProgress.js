const  CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) =>{
  const { courseId, subSectionId} = req.body;
  const userId=req.user.id;
  if (!courseId || !subSectionId || !userId) {
    return res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }
   var progressObject =await CourseProgress.findOne({courseId,userId});
   if(progressObject?.completedVideos?.includes(subSectionId)){
    return res.status(400).json({
        success:false,
        message:'lecture is already marked'
    })
   }
   console.log(progressObject);
    if (!progressObject) {
      progressObject = await CourseProgress.create({
        courseId,
        completedVideos:[subSectionId],
        userId  
      })
      return res.status(200).json({
        success:true,
        message:'lecture marked as completed',
        progressObject
      })
    }
    const progressResponse=await CourseProgress.findByIdAndUpdate(progressObject._id,{$push:{completedVideos:subSectionId}},{new:true});
    return res.status(200).json({
        success:true,
        message:'lecture marked as completed',
        progressResponse
    })
}

// Alias for backward compatibility
exports.markComplete = exports.updateCourseProgress;

const { default: mongoose } = require("mongoose");

const courseProgressSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }]
})

module.exports=mongoose.model("CourseProgress",courseProgressSchema);
const { default: mongoose } = require("mongoose");

const subSectionSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  sectionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Section',
    required:true
  },
  title: {
    type: String,
  },
  timeDuration: {
    type: Number,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);

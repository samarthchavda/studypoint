const { default: mongoose } = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String, 
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User", 
    trim: true,
  },
  whatYouWillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  tag: [{
    type: String,
  }],
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
  },
  instructions:{
    type:[String]
  },
  status:{
    type:String,
    enum:["draft","published"]
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Course", courseSchema);

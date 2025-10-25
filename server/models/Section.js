const { default: mongoose } = require("mongoose");

const sectionSchema=mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    subSections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }]
   
})

module.exports=mongoose.model("Section",sectionSchema);
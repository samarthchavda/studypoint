const { default: mongoose } = require("mongoose");
const CourseProgress = require("./CourseProgress");

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    }, 
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    image:{
        type:String,
        required:true,
    }, 
    courseProgress:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"CourseProgress"
        }
    ],
    resetToken:{
        type:String
    },
    tokenExpires:{
        type:Date
    }

});

userSchema.post('save',(doc)=>{
    doc={
        ...doc,
        courseProgress:[]
    }   
})

module.exports=mongoose.model("User",userSchema);
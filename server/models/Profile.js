const { default: mongoose } = require("mongoose");

const profileSchema=mongoose.Schema({
    gender:{
        type:String,
    },
    dob:{ 
        type:Date,
    },
    about:{
        type:String,
        trim:true,
    },
    phoneNumber:{
        type:Number,
        trim:true,
    },
    countryCode:{
        type:String,
        trim:true
    }
});

module.exports=mongoose.model("Profile",profileSchema);
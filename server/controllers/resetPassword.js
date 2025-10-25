const User = require("../models/User");
const crypto=require('crypto');
const mailSender = require("../utils/mailSender");
const bcrypt=require('bcrypt');
exports.resetPasswordToken=async(req,res)=>{
    try {
                //fetch email
                const{email}=req.body;    
                //check user
                if(!email){
                     return res.status(400).json({
                         success:false,
                         message:"email not provided"
                    });
                }
                const user=await User.findOne({email});
                if(!user){
                     return res.status(404).json({
                         success:false,
                         message:"user is not registered"
                    });
                }
                //create token and insert it into the user model
                const resetToken=crypto.randomUUID();
                const updatedUser=await User.findOneAndUpdate({email},
                    {   
                        resetToken:resetToken,
                        tokenExpires:Date.now()+5*60*1000
                    },
                    {new:true})
        
                //create link
                const url=`https://studynotion-frontend-dun.vercel.app/forgot-password/${resetToken}`;
        
                //send link to email
                const resetPasswordMail=await mailSender(email,"link for reseting password",
                    `click on this link to reset your password ${url}`);
                //return response
                 return res.status(200).json({
                     success:true,
                     message:"mail for reseting password is sent successfully"
                });
    } catch (error) {
        console.log('Error in reset password token', error); 
        return res.status(500).json({
            success: false,
            message: 'failure in reset password token'
        });
    }
}

exports.resetPassword=async(req,res)=>{
    try {
        //fetch data
        const{token,password,confirmPassword}=req.body;
        //validation and checking token
        if(!token||!password||!confirmPassword){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        if(password!=confirmPassword){
             return res.status(400).json({
                 success:false,
                 message:"passwords didnt match"
            });
        }
        const tokenEntry=await User.findOne({resetToken:token});
        if(!tokenEntry){
             return res.status(404).json({
                 success:false,
                 message:"no token found,invalid token"
            });
        }
        //checking token expiry
        if(tokenEntry.tokenExpires<Date.now()){
             return res.status(403).json({
                 success:false,
                 message:"token expired for resting password"
            });
        }
        //hash password
        const hashedPass=await bcrypt.hash(password,10);
        //update password in db
        const updatedUser=await User.findOneAndUpdate({resetToken:token},
            {password:hashedPass,resetToken:'',tokenExpires:''},{new:true});
        const sentMail=await mailSender(updatedUser.email,"Your password has reset",
            "your studyNotion password has successfully changed!")
         return res.status(200).json({
             success:true,
             message:"password reseted successfully"
        });

    } catch (error) {
        console.log('error in resting password', error);
        return res.status(500).json({
            success: false,
            message: 'failure in resetting password'
        });
    }
}
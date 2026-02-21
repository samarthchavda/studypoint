const { generate } = require('otp-generator');
const OTP=require('../models/OTP');
const Profile = require('../models/Profile');
const User = require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const smsSender = require('../utils/smsSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

//signup
exports.signup=async(req,res)=>{
    
    try {
       //fetch details
    const{firstName,lastName,email,password,accountType,
        confirmPassword,otp, phoneNumber}=req.body;
        
    //validation - phone number is now REQUIRED
        if(!firstName||!lastName||!password||!accountType||!confirmPassword||!otp||!phoneNumber){
            return res.status(400).json({
                success:false,
                message:"Phone number is required. First name, last name, password, and account type are required."
            })
        }
        
        // Validate Indian phone format - should be +91 followed by 10 digits
        const phoneRegex = /^\+91\d{10}$/;
        if(!phoneRegex.test(phoneNumber)){
            return res.status(400).json({
                success:false,
                message:"Invalid Indian phone number format. Use +91 followed by 10 digits."
            })
        }
        
        // Additional validation: Check if phone starts with valid Indian mobile prefix (6-9)
        const phoneDigits = phoneNumber.substring(3); // Remove +91
        const validPrefixes = ['6', '7', '8', '9'];
        if (!validPrefixes.includes(phoneDigits[0])) {
            return res.status(400).json({
                success: false,
                message: "Invalid mobile number. Indian mobile numbers must start with 6, 7, 8, or 9."
            });
        }
        
        // Email is optional now - but validate if provided
        if(email){
            const emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(!emailRegex.test(email)){
                return res.status(400).json({
                    success:false,
                    message:"Email is not valid (if provided)"
                })
            }
        }
        
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords don't match"
            })
        }
        
    //check if user already exists - check by phone (primary identifier)
        const checkUserByPhone = await User.findOne({phoneNumber});
        if(checkUserByPhone){
             return res.status(400).json({
                 success:false,
                 message:"This phone number is already registered"
            });
        }
        
        // Also check by email if provided
        if(email){
            const checkUserByEmail = await User.findOne({email});
            if(checkUserByEmail){
                 return res.status(400).json({
                     success:false,
                     message:"This email is already registered"
                });
            }
        }
        
    //check for otp - use phone as primary contact
        const recentOTP = await OTP.find({phoneNumber}).sort({createdAt:-1}).limit(1);

        if(recentOTP.length == 0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message:'OTP not found. Please request a new OTP.',
            });
        }
        else if(recentOTP[0].otp!==otp){
             return res.status(400).json({
                 success:false,
                 message:"OTP is not valid"
            });
        }
        
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);

    //create db entry
    const pd={
        gender:null,
        phoneNumber:phoneNumber,
        about:null,
        dob:null,
        countryCode:"+91"
    }
    const ProfileDetails=await Profile.create(pd);
    
    const user=await User.create({
        firstName,
        lastName,
        email: email || `user${phoneNumber}@studynotion.local`,  // Fallback email if not provided
        accountType,
        password:hashedPassword,
        additionalDetails:ProfileDetails._id,
        phoneNumber: phoneNumber,  // Store full phone with +91
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })

     return res.status(201).json({
         success:true,
         message:"User created successfully",
         user
    });
 
    } catch (error) {
        console.log("Error during signup:",error);
         return res.status(500).json({
             success:false,
             message:"Error during signup"
        });
    }
}
//login
exports.login=async (req,res)=>{
    try {
    //fetch data
    const {email,password}=req.body;
    //validation
    if(!email||!password){
         return res.status(400).json({
             success:false,
             message:"email or password is missing"
        });
    }
    //check if user exist
    const checkUser=await User.findOne({email});
    if(!checkUser){
         return res.status(404).json({
             success:false,
             message:"user is not registered"
        });
    }
    //password match
    const passMatch=await bcrypt.compare(password,checkUser.password);
    if(!passMatch){
         return res.status(400).json({
             success:false,
             message:"password not matched"
        });
    }
    //create token
    checkUser.password=undefined;
    const jwtPayload={
        email,
        id:checkUser._id,
        accountType:checkUser.accountType
    }
    const token=jwt.sign(jwtPayload,process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
    checkUser.token=token;
    //send cookie and token
    return res.cookie('token',token,{
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true
    }).json({
        success:true,
        token,
        user:checkUser,
        message:"user logged in successfully"
    })  
    } catch (error) {
        console.log("error while login",error);
         return res.status(500).json({
             success:false,
             message:"error while login"
        });
    }
}  
//send otp
exports.sendOTP=async (req,res)=>{
    try {
     //fetch phone number (REQUIRED FOR INDIAN USERS)
        const{phoneNumber}=req.body;
        
        // Phone number is mandatory
        if(!phoneNumber){
             return res.status(400).json({
                 success:false,
                 message:"Phone number is required"
            });
        }

        // Validate Indian phone format - +91 followed by 10 digits
        const phoneRegex = /^\+91\d{10}$/;
        if(!phoneRegex.test(phoneNumber)){
            return res.status(400).json({
                success:false,
                message:"Invalid Indian phone number format. Use +91 followed by 10 digits."
            });
        }

        // Additional validation: Check if phone starts with valid Indian mobile prefix (6-9)
        const phoneDigits = phoneNumber.substring(3); // Remove +91
        const validPrefixes = ['6', '7', '8', '9'];
        if (!validPrefixes.includes(phoneDigits[0])) {
            return res.status(400).json({
                success: false,
                message: "Invalid mobile number. Indian mobile numbers must start with 6, 7, 8, or 9."
            });
        }

    //checkUser - check if already registered by phone
        const user=await User.findOne({phoneNumber});
        if(user){
             return res.status(401).json({
                 success:false,
                 message:"This phone number is already registered"
            });
        }

    //otp create
        let otpp=generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated:",otpp);
        
        // Check for unique OTP
        let existingOTP = await OTP.findOne({otp:otpp});
        while(existingOTP){
            otpp=generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            existingOTP = await OTP.findOne({otp:otpp});
        }
        
    //create db entry - SMS only for Indian numbers
        console.log("Creating OTP document for Indian phone:", phoneNumber);
        const otpDoc = await OTP.create({
            phoneNumber: phoneNumber,
            otp: otpp,
            sendMethod: "sms"  // Always SMS for Indian users
        });
        console.log("OTP document created successfully:", otpDoc);

        // Send OTP via SMS
        const smsResult = await smsSender(phoneNumber, otpp);
        
        // For development/testing: Always return success even if SMS fails
        // This allows testing with Twilio trial accounts
        const isDevelopment = process.env.NODE_ENV !== 'production';
        
        if (!smsResult.success && !isDevelopment) {
            return res.status(500).json({
                success: false,
                message: 'Failed to send OTP SMS.',
                error: smsResult.message || 'Unknown SMS error',
            });
        }

        // Log OTP for development
        if (isDevelopment) {
            console.log('\n🔑 ========================================');
            console.log('🔑 DEVELOPMENT MODE - OTP FOR TESTING');
            console.log('🔑 Phone:', phoneNumber);
            console.log('🔑 OTP:', otpp);
            console.log('🔑 ========================================\n');
        }

        return res.status(200).json({
            success: true,
            message: smsResult.success 
                ? "OTP sent successfully via SMS" 
                : "OTP generated (SMS failed - check console for OTP)",
            contact: phoneNumber,
            sendMethod: "sms",
            smsDelivered: smsResult.success,
            // Show OTP in response for development/testing
            otp: isDevelopment ? otpp : undefined,
        });
    } catch (error) {
        console.log('Error while generating/sending OTP:', error);
        console.error('Full error stack:', error.stack);
        return res.status(500).json({
            success: false,
            message: 'Failed to send OTP. Please try again.',
            error: error.message
        });
    }
}
//change password
exports.changePassword=async(req,res)=>{
    try {
        //data fetch
        const{oldPassword,password}=req.body;
        //validation
        if(!password||!oldPassword){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        //password check
        // if(password!=confirmPassword){
        //      return res.status(400).json({
        //          success:false,
        //          message:"passwords not matched"
        //     });
        // }
        //old password check
        let user=await User.findById(req.user.id);
        if(!user){
             return res.status(400).json({
                 success:false,
                 message:"user is not registered"
            });
        }
        const oldPassCheck=await bcrypt.compare(oldPassword,user.password);
        if(!oldPassCheck){
             return res.status(401).json({
                 success:false,
                 message:"old password is not correct"
            });
        }
        //password hash
        const hashedPassword=await bcrypt.hash(password,10);
        //update password in db
        user=await User.findByIdAndUpdate(req.user.id,{password:hashedPassword},{new:true})
        //send mail to user
        const passUpdateMail=await mailSender(req.user.email,	passwordUpdated(
					user.email,
					`Password updated successfully for ${user.firstName} ${user.lastName}`
				)); 
        //return response
        return res.status(200).json({
             success:true,
             message:"password changed successfully"
        });
    } catch (error) {
        console.log('error in changing password', error);
        return res.status(500).json({
            success: false,
            message: 'failure in changing password'
        });
    }
}


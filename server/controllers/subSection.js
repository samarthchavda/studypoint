const Section=require('../models/Section');
const SubSection=require('../models/SubSection');
const { videoUpload } = require('../utils/cloudinaryUpload');
require('dotenv').config();
exports.createSubSection=async (req,res)=>{
    try {
        const{title,timeDuration,description,courseId,sectionId}=req.body;
        if(!title ||!timeDuration || !description || !sectionId){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        const{videoFile}=req.files;
        console.log("videoFile",videoFile);
        const video=await videoUpload(videoFile,process.env.FOLDERNAME);
        console.log("video",video);
        const subSection=await SubSection.create({
            title,timeDuration,description,videoUrl:video.secure_url,courseId,sectionId
        });
        const updatedSection=await Section.findByIdAndUpdate(sectionId,{
            $push:{subSections:subSection._id}
        },{new:true}).populate("subSections");

         return res.status(201).json({
             success:true,
             message:"subSection created successfully",
             subSection,
             updatedSection
        });
    
    } catch (error) {
        console.log('error while creating subSection', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while creating subSection'
        });
    }
    
}

exports.updateSubSection=async (req,res)=>{
    try {
        const{subSectionId,description,title,timeDuration}=req.body;
        const video=req?.files?.videoFile;
        console.log(video,"video");
        if(!subSectionId||(!description && !title && !timeDuration && !video)){
            return res.status(400).json({
                success:false,
                message:"subsectionid and one of the field are required"
           });
       }
       let updateObject={}; 
       if(video){
        const videoUploaded=await videoUpload(video,process.env.FOLDERNAME);
        if(!videoUploaded || !videoUploaded.secure_url) 
            throw new Error("video not uploaded");
        updateObject.videoUrl=videoUploaded?.secure_url;
        updateObject.timeDuration=timeDuration;
       }
       if(description){
        updateObject.description=description
       }
       if(title){
        updateObject.title=title
       }
       if(timeDuration){
        updateObject.timeDuration=timeDuration
       }
       console.log("update object",updateObject);
        const updatedSubSection=await SubSection.findByIdAndUpdate(subSectionId,updateObject,{new:true});
        console.log("updated subsection",updatedSubSection);
        return res.status(200).json({
        success:true,
        message:"subsection updated successfully",
        updatedSubSection
    });
    } catch (error) {
        console.log('error while updating subsection', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while updating subsection'
        });
    }
}

exports.deleteSubSection=async (req,res)=>{
    try {
        const{sectionId,subSectionId}=req.body;
        const deletedSubSection=await SubSection.findByIdAndDelete(subSectionId);
        //should i write code delete subsection from the section?
        const updatedSection=await Section.findByIdAndUpdate(sectionId,{
            $pull:{
                subSections:subSectionId
            }
        },{new:true}).populate("subSections");
        console.log("updated section",updatedSection);
         return res.status(200).json({
             success:true,
             message:"subsection deleted successfully",
             deletedSubSection,
             updatedSection
        });
    } catch (error) {
        console.log('error while deleting subsection', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while deleting subsection'
        });
    }
}

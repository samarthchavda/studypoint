const Course=require('../models/Course');
const Section=require('../models/Section');
const SubSection = require('../models/SubSection');
exports.createSection=async (req,res)=>{    
    try {
        const{name,courseId}=req.body;
        if(!name || !courseId){
             return res.status(400).json({
                 success:false,
                 message:"all fields are required"
            });
        }
        const course=await Course.findById(courseId);
        if(!course){
             return res.status(400).json({
                 success:false,
                 message:"the course does not exist"
            });
        }
        const section=await Section.create({
            name,
            courseId
        });
        const updatedCourse=await Course.findByIdAndUpdate(courseId,{
            $push:{courseContent:section._id}
        },{new:true}).populate("courseContent");

         return res.status(201).json({
             success:true,
             message:"section created successfully",
             section,
             updatedCourse
        });
    
    } catch (error) {
        console.log('error while creating section', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while creating section'
        });
    }
    
}

exports.updateSection=async (req,res)=>{
    try {
        const{sectionId,name}=req.body;
        if(!sectionId||!name){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
           });
       }
        const updatedSection=await Section.findByIdAndUpdate(sectionId,{name:name},{new:true});
        return res.status(200).json({
        success:true,
        message:"section updated successfully",
        updatedSection
    });
    } catch (error) {
        console.log('error while updating section', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while updating section'
        });
    }
}

exports.deleteSection=async (req,res)=>{
    try {
        const{sectionId,courseId}=req.body;
        if(!sectionId||!courseId){
             return res.status(400).json({
                 success:false,
                 message:"provide sectionid and courseid both"
            });
        }
        await SubSection.deleteMany({courseId,sectionId});
        const deletedSection=await Section.findByIdAndDelete(sectionId);
        //should i write code delete section from the course
        const updatedCourse=await Course.findByIdAndUpdate(courseId,{$pull:{
            courseContent:sectionId
        }},{new:true});
         return res.status(200).json({
             success:true,
             message:"section deleted successfully",
             deletedSection,
             updatedCourse
        });
    } catch (error) {
        console.log('error while deleting section', error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong while deleting section'
        });
    }
}
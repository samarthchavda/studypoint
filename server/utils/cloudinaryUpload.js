const cloudinary=require('cloudinary').v2;
exports.imageUpload=async(file,folder,height,quality)=>{
  try {
    let options={
        folder,
        resource_type:"image",
    }
    if(height){
        options.height=height;      
    }
    if(quality){
        options.quality=quality;
    }
    const upload=await cloudinary.uploader.upload(file.tempFilePath,options);
    return upload;
  } catch (error) {
      console.log('something went wrong while uploading image', error);
  }
}

exports.videoUpload=async(file,folder,height,quality)=>{
  try {
    let options={
        folder,
        resource_type:"auto",
    }
    if(height){
        options.height=height;      
    }
    if(quality){
        options.quality=quality;
    }
    const upload=await cloudinary.uploader.upload(file.tempFilePath,options);
    console.log("uploaded video",upload);
    return upload;
  } catch (error) {
      console.log('something went wrong while uploading video', error);
  }
}
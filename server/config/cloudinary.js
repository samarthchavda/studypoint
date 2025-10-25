const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APIKEY,
      api_secret: process.env.APISECRET,
    });
    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log("Cloudinary connection failed");
    console.error(error);
  }
};
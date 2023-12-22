import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const cloudinaryUploadFile = async(localFilePath) =>{
    try{
        if(!localFilePath) return null;
        const resp = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type:'auto'
            }
        )
        fs.unlinkSync(localFilePath)
        console.log("uploaded successfully")
        return resp;
    }catch(err){
        fs.unlinkSync(localFilePath)
        return null;
    }
}


export {cloudinaryUploadFile}
import multer from "multer"

const storage = multer.diskStorage({
    distination : (req,file,cb) =>{
        cb(null , './uploads/')
    },
    fileName: (req,file,cb) =>{
        cb(null,
        file.originalname)
    }
})

export const upload = multer({
    storage
})
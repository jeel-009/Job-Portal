import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLAUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.CLAUD_SECRECT_KEY
});

export default cloudinary;
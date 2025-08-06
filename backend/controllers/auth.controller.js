import bcryptjs from "bcryptjs"
import User from "../models/User.js"
import { errorHandler } from "../utils/error.js"
 
 
 export const register = async(req,res,next) =>{
    const{username,email,password}=req.body

    if(!username || !email || ! password || username==="" || email==="" || password==="")
    {
        return next(errorHandler(400,"All fiels are required."))
    }

    const hashedPassword=bcryptjs.hashSync(password,10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    })


    try{
        await newUser.save()

        res.json("Register successfully")
    }
    catch(error)
    {
        // res.status(500).json({message:error.message})
        next(error)
    }

 }


 export const login= async(req,res,next) =>
 {
    const {email,password}=req.body

    if(!email || ! password || email==="" || password==="")
    {
        return next(errorHandler(400,"All fiels are required."))
    }

     try 
     {
       const validUser=await User.findOne()
     }
     catch(error)
     {
        next(error)
     }
    
 }
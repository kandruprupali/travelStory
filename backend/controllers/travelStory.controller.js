import { fileURLToPath } from "url"
import TravelStory from "../models/TravelStory.js"
import { errorHandler } from "../utils/error.js"
import path from "path"
import fs from "fs"

export const addTravelStory = async(req,res,next) =>
{
    const {title,story,visitedLocation,imageUrl,visitedDate} = req.body 

    const userId = req.user.id 

    if(!title || !story || !visitedLocation || !imageUrl || !visitedDate)
    {
        return next(errorHandler(400,"All fields are required"))
    }

    //convert visited date from miliseconds to dare object 
    const parsedVisitedDate = new Date(parseInt(visitedDate))

    try 
    {
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId , 
            imageUrl,
            visitedDate : parsedVisitedDate ,
        })

        await travelStory.save()

        res.status(201).json({
            story:travelStory,
            message:"your story is added successfully",
        })
    }

    catch(error)
    {
        next(error)
    }
}

export const getAllTravelStroy = async(req,res,next) =>{
    const userId = req.user.id 

    try 
    {
        const travelStories = await TravelStory.find({userId}).sort({
            isFavourite :-1,
        })

        res.status(200).json({stories : travelStories})
    }
    catch(error)
    {
        next(error)
    }
}

export const imageUpload = async(req,res,next) =>{

    try 
    {
       if(!req.file)
       {
        return next(errorHandler(400,"No image uploaded"))
       }

       const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`

       res.status(201).json({imageUrl})
    }
    catch(error)
    {
        next(error)
    }
}


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.join(__dirname,"..")

export const deleteImage = async(req,res,next) => {
   const {imageUrl} = req.query 

   if(!imageUrl)
   {
    return next(errorHandler(400,"imageUrl parameter is required"))
   }

   try 
   {
       //extract the filename from imageUrl 
       const filename = path.basename(imageUrl)

       //delete file path 
       const filePath = path.join(rootDir,"uploads",filename)
       console.log(filePath)

       //check if the file exists 
       if(!fs.existsSync(filePath))
       {
        return next(errorHandler(404,"Image not found!"))
       }

       //delete the file 
       await fs.promises.unlink(filePath)

       res.status(200).json({message:"Image deleted successfully!"})
   }
   catch(error)
   {
    next(error)
   }
}

export const editTravelStory = async(req,res,next) =>{
     const {id} = req.params 
     const {title , story,visitedLocation,imageUrl,visitedDate} = req.body 
     const userId = req.user.id 

     //validate required field 
      
     if(!title || !story || !visitedLocation || !imageUrl || !visitedDate)
    {
        return next(errorHandler(400,"All fields are required"))
    } 
    
    //convert visited date from miliseconds to dare object 
    const parsedVisitedDate = new Date(parseInt(visitedDate)) 

    try
    {
       const travelStory = await TravelStory.findOne({_id:id , userId:userId})

       if(!travelStory)
       {
        next(errorHandler(404,"Travel story not found!"))
       }

       const placeholderImageUrl = `http://localhost:3000/assets/placeholder.jpeg` 

       travelStory.title = title 
       travelStory.story=story
       travelStory.visitedLocation=visitedLocation
       travelStory.imageUrl=imageUrl || placeholderImageUrl
       travelStory.visitedDate=parsedVisitedDate

       await travelStory.save()

       res.status(200).json({
        story:travelStory,
        message:"Travel story updated successfullly!"
       })
    }
    catch(error) 
    {
        next(error)
    }


}

export const deleteTravelStory = async(req,res,next) =>{
    const {id} = req.params 
    const userId = req.user.id 

    try
    {
         const travelStory = await TravelStory.findOne({_id:id , userId:userId})

        if(!travelStory)
       {
        next(errorHandler(404,"Travel story not found!"))
       }

       //delete travel story from the database 
       await travelStory.deleteOne({_id:id,userId:userId})

       //extract the filename from imageUrl 
       const imageUrl = travelStory.imageUrl
       const filename = path.basename(imageUrl)

       //delete the filepath 
       const filePath = path.join(rootDir,"uploads",filename)

       //check if the file path exists 
       if(!fs.existsSync(filePath))
       {
        return next(errorHandler(404,"Image not found"))
       }

       //delete the file 
       await fs.promises.unlink(filePath)

       res.status(200).json({message:"Travel story deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }
}

export const updateIsFavourite = async(req,res,next) =>{
    const {id} = req.params 
    const {isFavorite} = req.body
    const userId = req.user.id 

    try 
    {
        const travelStory = await TravelStory.findOne({_id:id,userId:userId})

        if(!travelStory)
        {
            return next(errorHandler(404,"Travel story not found!"))
        }

        travelStory.isFavorite = isFavorite

        await travelStory.save()

        res.status(200).json({story:travelStory,message:"updated successfully"})
    }
    catch(error)
    {
        next(error)
    }
}
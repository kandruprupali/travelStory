import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { addTravelStory, deleteImage, deleteTravelStory, editTravelStory, getAllTravelStroy, imageUpload, updateIsFavourite } from "../controllers/travelStory.controller.js"
import upload from "../multer.js"

const router=express.Router()
router.post("/image-upload",upload.single("image") , imageUpload)
router.post("/add",verifyToken,addTravelStory)
router.get("/get-all",verifyToken,getAllTravelStroy)
router.delete("/delete-image" , deleteImage)
router.post("/edit-story/:id",verifyToken , editTravelStory)
router.delete("/delete-story/:id",verifyToken,deleteTravelStory)
router.put("/update-is-favourite/:id",verifyToken,updateIsFavourite)

export default router
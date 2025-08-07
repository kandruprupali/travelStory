import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { addTravelStory, getAllTravelStroy } from "../controllers/travelStory.controller.js"

const router=express.Router()

router.post("/add",verifyToken,addTravelStory)
router.get("/get-all",verifyToken,getAllTravelStroy)

export default router
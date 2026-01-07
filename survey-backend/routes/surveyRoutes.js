const express=require("express");
const {authMiddleware}=require("../middleware/authMiddleware")
const router=express.Router();
const {createSurvey,getMySurveys}=require("../controllers/surveyController");




router.post("/",authMiddleware,createSurvey)
router.get("/",authMiddleware,getMySurveys)

module.exports=router;
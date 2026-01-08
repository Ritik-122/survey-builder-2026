const express=require("express");
const {authMiddleware}=require("../middleware/authMiddleware")
const router=express.Router();
const {createSurvey,getMySurveys,getPublicSurvey,publishSurvey,addQuestions}=require("../controllers/surveyController");



router.post("/:surveyId/questions",authMiddleware,addQuestions);
router.patch("/:surveyId/publish",authMiddleware,publishSurvey);
router.get("/public/:surveyId",getPublicSurvey);
router.post("/",authMiddleware,createSurvey)
router.get("/",authMiddleware,getMySurveys)

module.exports=router;
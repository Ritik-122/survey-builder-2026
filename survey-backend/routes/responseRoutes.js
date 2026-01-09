const express = require("express");
const router = express.Router();

const {authMiddleware} = require("../middleware/authMiddleware");
const {
  getSurveyAnalytics,
  submitResponse,
} = require("../controllers/responseController");
router.post("/:surveyId", submitResponse);
router.get("/analytics/:surveyId", authMiddleware, getSurveyAnalytics);

module.exports = router;

const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { exportResponses } = require("../controllers/exportController");
const {
  getSurveyAnalytics,
  submitResponse,
} = require("../controllers/responseController");
router.get("/analytics/:surveyId", authMiddleware, getSurveyAnalytics);
router.get("/export/:surveyId", authMiddleware, exportResponses);
router.post("/:surveyId", submitResponse);
module.exports = router;

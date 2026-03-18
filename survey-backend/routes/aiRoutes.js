const express = require("express");
const router = express.Router();
const { generateInsights } = require("../controllers/aiController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/insights/:surveyId", authMiddleware, generateInsights);

module.exports = router;
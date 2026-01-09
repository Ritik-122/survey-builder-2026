const Response = require("../model/Response");
const Survey = require("../model/Survey");

exports.submitResponse = async (req, res) => {
  try {
    const { surveyId } = req.params;

    const survey = await Survey.findOne({ _id: surveyId, published: true });

    if (!survey) {
      return res.status(400).json({ message: "Survey not found" });
    }

    const existing=await Response.findOne({
        surveyId,
        submittedBy:req.body.email
    });
    if(existing){
        return res.status(400).json({message:"Already submitted"});
    }

    const response = await Response.create({
      surveyId,
      answers: req.body.answers,
      submittedBy: req.body.email || "anonymous",
    });
    res.status(201).json({ message: "Response submitted", response });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit response" });
  }
};

exports.getSurveyAnalytics = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const count = await Response.countDocuments({ surveyId });
    res.json({ totlaResponses: count });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

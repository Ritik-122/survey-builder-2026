const Survey = require("../model/Survey");

exports.createSurvey = async (req, res) => {
  try {
    const survey = await Survey.create({
      title: req.body.title,
      questions: [],
      owner: req.userId,
    });
    res.status(201).json(survey);
  } catch (err) {
    res.status(500).json({ message: "Failed to create survey" });
  }
};

exports.getMySurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ owner: req.userId });
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch surveys" });
  }
};

exports.addQuestions = async (req, res) => {
  try {
    const surveyId = req.params.surveyId;
    const survey = await Survey.findOne({
      _id: surveyId,
      owner: req.userId,
    });

    if (!survey) {
      return res.status(404).json({ message: "Survey not Found" });
    }

    survey.questions.push(req.body);
    await survey.save();
    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: "Failed to add question" });
  }
};

exports.publishSurvey = async (req, res) => {
  try {
    const survey = await Survey.findOneAndUpdate(
      { _id: req.params.surveyId, owner: req.userId },
      { published: req.body.published },
      { new: true }
    );

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.json(survey);
  } catch (err) {
    res.status;
    res.status(500).json({ message: "Failed to publish survey" });
  }
};

exports.updateSurveyTitle = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const { title } = req.body;

    const survey = await Survey.findOneAndUpdate(
      { _id: surveyId, owner: req.userId },
      { title },
      { new: true }
    );
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.json(survey);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update title" });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { surveyId, questionIndex } = req.params;
    const updates = req.body;
    const survey = await Survey.findOne({
      _id: surveyId,
      owner: req.userId,
    });
    if (!survey) {
      return res.status(400).json({ message: "Survey not found" });
    }
    const question = survey.questions[questionIndex];
    if (!question) {
      return res.status(400).json({ message: "Question not found" });
    }
    survey.questions[questionIndex] = {
      type: question.type,
      label: updates.label ?? question.label,
      options:
        question.type === "mcq" ? updates.options ?? question.options : [],
      required: updates.required ?? question.required,
    };
    survey.markModified("questions");

    await survey.save();
    res.json(survey);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update questions" });
  }
};

exports.getPublicSurvey = async (req, res) => {
  try {
    const publishedSurvey = await Survey.findOne({
      _id: req.params.surveyId,
      published: true,
    }).select("-owner");

    if (!publishedSurvey) {
      return res.status(400).json({ message: "Survey not available" });
    }

    res.json(publishedSurvey);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch Survey" });
  }
};

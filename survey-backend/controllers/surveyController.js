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

try{

    const surveys=await Survey.find({owner:req.userId});
    res.json(surveys);

}catch(err){
    res.status(500).json({message:"Failed to fetch surveys"});
}

};

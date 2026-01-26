const { Parser } = require("json2csv");
const Response = require("../model/Response");
const { uploadToS3 } = require("../utils/s3");

exports.exportResponses = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const responses = await Response.find({ surveyId: surveyId });
    if (!responses.length) {
      return res.status(404).json({ message: "No responses found" });
    }
    const formatted = responses.flatMap((r) =>
      r.answers.map((a) => ({
        responseId: r._id.toString(),
        questionIndex: a.questionIndex,
        answer: a.value,
        submittedAt: r.createdAt,
      }))
    );
    const parser = new Parser();
    const csv = parser.parse(formatted);

    const fileKey = `exports/survey-${surveyId}-${Date.now()}.csv`;
    console.log("S3 FIle Key:", fileKey);


    const url = await uploadToS3(fileKey, csv);
    res.json({ downloadUrl: url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to export responses" });
  }
};

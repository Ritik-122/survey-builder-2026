const OpenAI = require("openai");
const Response = require("../model/Response");


const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
exports.generateInsights = async (req, res) => {
  try {
    const { surveyId } = req.params;

    const responses = await Response.find({surveyId });
    console.log(responses);

    if (!responses.length) {
      return res.json({ insight: "No responses available yet." });
    }

    const formatted = responses
      .map((r) => r.answers.map((a) => a.value).join(", "))
      .join("\n");

    const prompt = `
You are a data analyst.

Analyze these survey responses and provide 3 short insights.

Responses:
${formatted}

Respond in bullet points.
`;
    console.log(prompt);
    const completion = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert survey data analyst." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });
    console.log(completion);

    const insight = completion.choices[0].message.content;

    res.json({ insight });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};

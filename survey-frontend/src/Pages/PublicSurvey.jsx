import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const PublicSurvey = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/surveys/public/${id}`)
      .then((res) => setSurvey(res.data));
  }, [id]);

  const submitSurvey = async () => {
    try {
      const formattedAnswers = Object.keys(answers).map((key) => ({
        questionIndex: Number(key),
        value: answers[key],
      }));
      await axios.post(`http://localhost:5000/api/responses/${id}`, {
        answers: formattedAnswers,
      });
      toast.success("Survey Submitted successfully");
      setAnswers({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit survey");
    }
  };
  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  if (!survey) return <p className="p-6">Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xlmb-6">{survey.title}</h1>
      {survey.questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="mb-2">{q.label}</p>
          {q.type === "text" && (
            <input
              className="input"
              onChange={(e) => handleChange(i, e.target.value)}
            />
          )}
          {q.type === "mcq" &&
            q.options.map((opt, idx) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={i}
                  onChange={() => handleChange(i, opt)}
                />{" "}
                {opt}
              </label>
            ))}
        </div>
      ))}
      <button
        onClick={submitSurvey}
        className="mt-6 bg-blue-600 px-6 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

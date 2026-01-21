import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
export const Builder = () => {
  const { id } = useParams();

  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    api.get(`/surveys`).then((res) => {
      const found = res.data.find((s) => s._id === id);
      setSurvey(found);
    });
  }, [id]);

  const addQuestion = async (type) => {
    let question = {
      type,
      label: "Untitled Question",
      options: [],
    };
    if (type == "mcq") {
      question.options = ["Option 1", "Option 2"];
    }

    await api.post(`/surveys/${id}/questions`, question);

    const updated = await api.get("/surveys");
    setSurvey(updated.data.find((s) => s._id === id));
  };

  if (!survey) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      {/* Toolbox */}
      <div className="col-span-1 bg-gray-800 p-4 rounded">
        <h3 className="mb-4">Add Question</h3>
        <button onClick={() => addQuestion("text")} className="btn">
          Text
        </button>
        <button onClick={() => addQuestion("mcq")} className="btn">
          MCQ
        </button>
        <button onClick={() => addQuestion("rating")} className="btn">
          Rating
        </button>
      </div>
      {/* Canvas */}
      <div className="col-span-3 bg-gray-900 p-4 rounded">
        <h2 className="text-xl mb-4">{survey.title}</h2>
        <button
          onClick={async () => {
            await api.patch(`/surveys/${id}/publish`, {
              published: !survey.published,
            });
            const updated = await api.get("/surveys");
            setSurvey(updated.data.find((s) => s._id === id));
          }}
          className={`mb-4 px-4 py-1rounded ${
            survey.published ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {survey.published ? "Unpublish" : "Publish"}
        </button>
        {survey.published && (
          <p className="text-sm text-gray-400">
            Share link:{" "}
            <a
              href={`http://localhost:3000/survey/${id}`}
              target="_blank"
              rel="nonreferrer"
              className="text-blue-400 underline"
            >
              Open Survey
            </a>
          </p>
        )}
        {survey.questions?.map((q, i) => (
          <div key={i} className="bg-gray-800 p-3 rounded mb-3">
            <p className="mb-2">{q.label}</p>
            {q.type === "text" && <input className="input" />}
            {q.type === "mcq" &&
              q.options.map((opt, idx) => <div key={idx}>{opt}</div>)}
            {q.type === "rating" && <p>⭐ ⭐ ⭐ ⭐ ⭐</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

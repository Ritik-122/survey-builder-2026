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

  const updateTitle = async () => {
    await api.patch(`/surveys/${id}/title`, { title: survey.title });
  };

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

  const updateQuestion = async (index, updates) => {
    await api.patch(`/surveys/${id}/questions/${index}`, updates);
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
        <p className="text-xl mb-4">{survey.title}</p>
        <div className="flex items-center justify-between mb-6">
          <input
            value={survey.title}
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
            onBlur={updateTitle}
            className="text-xl mb-4 bg-transparent border-b border-gray-600 focus:outline-none focus-border-blue-500"
          />
          <button
            onClick={async () => {
              await api.patch(`/surveys/${id}/publish`, {
                published: !survey.published,
              });
              const updated = await api.get("/surveys");
              setSurvey(updated.data.find((s) => s._id === id));
            }}
            className={`mb-4 px-4 py-2 rounded ${
              survey.published ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {survey.published ? "Unpublish" : "Publish"}
          </button>
        </div>
        {survey.published && (
          <p className="text-sm text-gray-400 mb-4">
            Share link:{" "}
            <a
              href={`${window.location.origin}/survey/${id}`}
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
            <input
              value={q.label}
              onChange={(e) => {
                const updated = [...survey.questions];
                updated[i].label = e.target.value;
                setSurvey({ ...survey, questions: updated });
              }}
              onBlur={() => updateQuestion(i, { label: q.label })}
              className="w-full bg-transparent text-lg border-b border-gray-600 focus:outline-none focus:border-blue-500 mb-3"
            />
            {q.type === "text" && <input className="input" />}
            {q.type === "mcq" &&
              q.options.map((opt, idx) => (
                <input
                  key={idx}
                  value={opt}
                  onChange={(e) => {
                    const updated = [...survey.questions];
                    updated[i].options[idx] = e.target.value;
                    setSurvey({ ...survey, questions: updated });
                  }}
                  onBlur={() => 
                  updateQuestion(i, { options: q.options })}
                  className="block w-ful bg-transparent border-b border-gray-700 mb-2"
                />
              ))}
            {q.type === "rating" && <p>⭐ ⭐ ⭐ ⭐ ⭐</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

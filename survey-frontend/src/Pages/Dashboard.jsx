import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
export const Dashboard = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    api.get("/surveys").then((res) => setSurveys(res.data));
  }, []);

  const createSurvey = async () => {
    const res = await api.post("/surveys", {
      title: "Untitled Survey",
    });
    setSurveys([...surveys, res.data]);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          className="text-sm text-red-400"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
        <h1 className="text-2xl">My Surveys</h1>
        <button
          onClick={createSurvey}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          +New Survey
        </button>
      </div>

      <div className="grid gap-4">
        {surveys.map((s) => (
          <div
            key={s._id}
            onClick={() => navigate(`/builder/${s._id}`)}
            className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 flex justify-between"
          >
            <span>{s.title}</span>
            <span className="text-sm text-gray-400">
              {s.published ? "Published" : "Draft"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
export const Dashboard = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/surveys");
      setSurveys(res.data);
      const stats = {};
      for (let s of res.data) {
        const a = await api.get(`/responses/analytics/${s._id}`);
        console.log(a, "inside patch");
        stats[s._id] = a.data.totalResponses;
      }
      console.log(stats);
      setAnalytics(stats);
    };
    fetchData();
  }, []);

  const createSurvey = async () => {
    const res = await api.post("/surveys", {
      title: "Untitled Survey",
    });
    setSurveys([...surveys, res.data]);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 ">
        <button
          className="text-sm text-red-400 cursor-pointer"
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
          className="bg-blue-600 px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          +New Survey
        </button>
      </div>

      <div className="grid gap-4">
        {surveys.map((s) => (
          <div
            key={s._id}
            onClick={() => navigate(`/builder/${s._id}`)}
            className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{s.title}</h3>
              <p className="text-sm text-gray-400">
                Status: {s.published ? "Published" : "Draft"}
              </p>
              <p className="text-sm text-gray-400">
                Response:{analytics[s._id] || 0}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/builder/${s._id}`);
                }}
                className="text-blue-400 text-sm cusror-pointer hover:text-blue-300 hover:underline transition-all duration-150"
              >
                Edits
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/analytics/${s._id}`);
                }}
                className="text-green-400 text-sm cusror-pointer hover:text-green-300 hover:underline transition-all duration-150"
              >
                Analytics
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

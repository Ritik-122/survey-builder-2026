import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const Analytics = () => {
  const { id } = useParams();
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get(`/responses/analytics/${id}`).then((res) => {
      setCount(res.data.totalResponses);
    });
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Survey Analytics</h1>
      <div className="bg-gray-800 p-6 rounded">
        <p className="text-lg">Total Responses</p>
        <p className="text-3xl mt-2">{count}</p>
      </div>
    </div>
  );
};

export default Analytics;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import axios from "axios";

const Analytics = () => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleExport = async () => {
    try {
      setExporting(true);
      const res = await api.get(`responses/export/${id}`);

      const url = res.data.downloadUrl;
      window.open(url, "_blank");

      toast.success("CSV export started");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to export responses");
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    api.get(`/responses/analytics/${id}`).then((res) => {
      setCount(res.data.totalResponses);
    });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Survey Analytics</h1>
        <button
          onClick={handleExport}
          disabled={exporting}
          className={`px-4 py-2 rounded text-sm transition ${
            exporting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-1">Total Responses</p>
          <p className="text-3xl font-bold">{count}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-1">Coming Soon</p>
          <p className="text-lg">Charts & Trends</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

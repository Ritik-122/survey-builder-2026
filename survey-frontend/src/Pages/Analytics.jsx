import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import axios from "axios";

const Analytics = () => {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [exporting, setExporting] = useState(false);

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
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Survey Analytics</h2>
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
      <div className="bg-gray-800 p-6 rounded">
        <p className="text-lg">Total Responses</p>
        <p className="text-3xl mt-2">{count}</p>
      </div>
    </div>
  );
};

export default Analytics;

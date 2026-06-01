// WorkerStats.jsx
import React, { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../../apiService";
import { AuthContext } from "../../../context/AuthContext";

const WorkerStats = () => {

  const [submission, setSubmission] = useState()
  const [pending, setPending] = useState()
  const [earnings, setEarnings] = useState()

  const { user } = useContext(AuthContext);

  useEffect(()=>{

    if(!user?.email) return;

    (async()=> {
      await apiFetch(`/tasks/submit/count?email=${user?.email}`)
        .then(data => setSubmission(data.count))
    })()

  }, [user?.email])

  useEffect(()=>{

    if(!user?.email) return; 
    (async()=> {
      await apiFetch(`/tasks/submit/status-count?email=${user?.email}`)
        .then(data => setPending(data.pendingCount))
    })()

  }, [user?.email])


  useEffect(()=>{
    (()=>{
      if(!user?.email) return;
      (async()=>{
        await apiFetch(`/total-earning?email=${user?.email}`)
        .then(data => setEarnings(data.totalEarning))
      })()
    })()
  }, [user?.email])


  const stats = {
    totalSubmissions: submission || 0,
    pendingSubmissions: pending || 0,
    totalEarnings: earnings || 0, 
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Total Submissions */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 font-medium">
            Total Submissions
          </h3>
          <span className="text-3xl">📄</span>
        </div>
        <p className="text-3xl font-bold mt-4 text-blue-600">
          {stats.totalSubmissions}
        </p>
      </div>

      {/* Pending Submissions */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 font-medium">
            Pending Submissions
          </h3>
          <span className="text-3xl">⏳</span>
        </div>
        <p className="text-3xl font-bold mt-4 text-yellow-500">
          {stats.pendingSubmissions}
        </p>
      </div>

      {/* Total Earnings */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 font-medium">
            Total Earnings
          </h3>
          <span className="text-3xl">💰</span>
        </div>
        <p className="text-3xl font-bold mt-4 text-green-600">
          {stats.totalEarnings} Coins
        </p>
      </div>

    </div>
  );
};

export default WorkerStats;
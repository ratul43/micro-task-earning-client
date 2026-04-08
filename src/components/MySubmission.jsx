// MySubmission.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../apiService";


const getStatusStyle = (status) => {
  if (status === "approved")
    return "bg-green-100 text-green-600";
  if (status === "pending")
    return "bg-yellow-100 text-yellow-600";
  if (status === "rejected")
    return "bg-red-100 text-red-600";
};

const MySubmission = () => {
    const [submission, setSubmission] = useState([]);

  useEffect(()=>{

    (async()=>{
      await apiFetch(`/tasks/submit`)
      .then(data => setSubmission(data))
    })()

  }, [])
  // console.log(submission);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        My Submissions
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          
          {/* Head */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Task Title</th>
              <th className="py-2 px-4 text-center">Buyer</th>
              <th className="py-2 px-4 text-center">Earning</th>
              <th className="py-2 px-4 text-center">Submission</th>
              <th className="py-2 px-4 text-center">Date</th>
              <th className="py-2 px-4 text-center">Status</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {submission.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4 font-medium">
                  {item.task_title}
                </td>

                <td className="py-2 px-4 text-center">
                  {item.buyer_name}
                </td>

                <td className="py-2 px-4 text-center text-green-600 font-semibold">
                  {item.payable_amount} Coins
                </td>

                <td className="py-2 px-4 text-center text-sm text-gray-600">
                  {item.submission_details}
                </td>

                <td className="py-2 px-4 text-center">
                  {item.date}
                </td>

                {/* Status Badge */}
                <td className="py-2 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status.charAt(0).toUpperCase() +
                      item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default MySubmission;
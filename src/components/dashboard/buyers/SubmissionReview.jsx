// BuyerPendingSubmissions.jsx
import React, { useState } from "react";

const submissions = [
  {
    id: 1,
    worker_name: "Alice",
    task_title: "Watch YouTube video",
    payable_amount: 10,
    submission_details: "Screenshot of comment submitted",
  },
  {
    id: 2,
    worker_name: "Bob",
    task_title: "Like Instagram Post",
    payable_amount: 5,
    submission_details: "Profile screenshot uploaded",
  },
];

const SubmissionReview = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        Pending Submissions
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Worker Name</th>
              <th className="py-2 px-4 text-center">Task Title</th>
              <th className="py-2 px-4 text-center">Payable</th>
              <th className="py-2 px-4 text-center">Submission</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="py-2 px-4 font-medium">
                  {item.worker_name}
                </td>

                <td className="py-2 px-4 text-center">
                  {item.task_title}
                </td>

                <td className="py-2 px-4 text-center text-green-600 font-semibold">
                  {item.payable_amount} Coins
                </td>

                {/* View Submission */}
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => setSelectedSubmission(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>

                {/* Action Buttons */}
                <td className="py-2 px-4 text-center space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Modal (UI Only) */}
      {selectedSubmission && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setSelectedSubmission(null)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            
            <h3 className="text-xl font-bold mb-4">
              Submission Details
            </h3>

            <p className="text-gray-700">
              {selectedSubmission.submission_details}
            </p>

            <button
              onClick={() => setSelectedSubmission(null)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionReview;
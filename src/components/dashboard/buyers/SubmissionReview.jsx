// BuyerPendingSubmissions.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../apiService";
import { toast } from "react-toastify";

const SubmissionReview = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(()=>{
    (async()=>{
   const data = await apiFetch(`/tasks/submit`)
   setSubmissions(data)
  })()
  }, [])

//   console.log(submissions);

  const updateStatus = async (id) => {
    const res = await apiFetch(`/tasks/submit/review/${id}`, {
      method: "PUT",
    });

    if(res){
      // Update the submission status in the local state without reloading
      setSubmissions(prevSubmissions => 
        prevSubmissions.map(submission => 
          submission._id === id 
            ? { ...submission, status: "approved" }
            : submission
        )
      );
      toast.success("Submission approved successfully!");
      // Close modal if it's open for this submission
      if (selectedSubmission?._id === id) {
        setSelectedSubmission(null);
      }
    }
  }

  const deleteTask = async (id) => {
    const res = await apiFetch(`/tasks/submit?id=${id}`, {
      method: "DELETE",
    });

    if(res){
      // Remove the submission from local state without reloading
      setSubmissions(prevSubmissions => 
        prevSubmissions.filter(submission => submission._id !== id)
      );
      toast.success("Submission rejected successfully!");
      // Close modal if it's open for this submission
      if (selectedSubmission?._id === id) {
        setSelectedSubmission(null);
      }
    }
  };

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
                key={item._id}
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
                  {
                    item.status === "approved" ? 
                    <>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">Approved</span>

                    </> : 
                    <>

 <button onClick={() => updateStatus(item._id)} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">
                    Approve
                  </button>
                  <button onClick={()=>deleteTask(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
                    Reject
                  </button>

                    </>
                  }
                 
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

            {/* Add Approve/Reject buttons in modal as well for convenience */}
            {selectedSubmission.status !== "approved" && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    updateStatus(selectedSubmission._id);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    deleteTask(selectedSubmission._id);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}

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
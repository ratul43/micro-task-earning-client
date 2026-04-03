// ApprovedSubmissions.jsx
import React from "react";

const submissions = [
  {
    id: 1,
    task_title: "Watch YouTube video and comment",
    payable_amount: 10,
    buyer_name: "John Doe",
    status: "approved",
  },
  {
    id: 2,
    task_title: "Like Instagram Post",
    payable_amount: 5,
    buyer_name: "Alice Smith",
    status: "approved",
  },
  {
    id: 3,
    task_title: "App Download & Review",
    payable_amount: 8,
    buyer_name: "Michael Lee",
    status: "approved",
  },
];

const ApprovedSubmissions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        Approved Submissions
      </h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          
          {/* Head */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Task Title</th>
              <th className="py-2 px-4 text-center">Payable Amount</th>
              <th className="py-2 px-4 text-center">Buyer Name</th>
              <th className="py-2 px-4 text-center">Status</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {submissions.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4 font-medium">
                  {item.task_title}
                </td>

                <td className="py-2 px-4 text-center text-green-600 font-semibold">
                  {item.payable_amount} Coins
                </td>

                <td className="py-2 px-4 text-center">
                  {item.buyer_name}
                </td>

                {/* Status Badge */}
                <td className="py-2 px-4 text-center">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    Approved
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

export default ApprovedSubmissions;
// MyTasks.jsx
import React from "react";

const tasks = [
  {
    id: 1,
    title: "Watch YouTube video and comment",
    workers: 100,
    payable: 10,
    total: 1000,
    deadline: "2026-05-01",
    submission: "Screenshot proof",
  },
  {
    id: 2,
    title: "Like Instagram Post",
    workers: 50,
    payable: 5,
    total: 250,
    deadline: "2026-04-20",
    submission: "Profile screenshot",
  },
  {
    id: 3,
    title: "App Download & Review",
    workers: 200,
    payable: 8,
    total: 1600,
    deadline: "2026-04-15",
    submission: "Playstore review screenshot",
  },
];

const AddedTasks = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">My Added Tasks</h2>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          
          {/* Head */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4">Workers</th>
              <th className="py-2 px-4">Pay/Worker</th>
              <th className="py-2 px-4">Total Cost</th>
              <th className="py-2 px-4">Deadline</th>
              <th className="py-2 px-4">Submission</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4 font-medium">
                  {task.title}
                </td>
                <td className="py-2 px-4 text-center">
                  {task.workers}
                </td>
                <td className="py-2 px-4 text-center">
                  {task.payable}
                </td>
                <td className="py-2 px-4 text-center text-blue-600 font-semibold">
                  {task.total}
                </td>
                <td className="py-2 px-4 text-center">
                  {task.deadline}
                </td>
                <td className="py-2 px-4 text-center">
                  {task.submission}
                </td>

                {/* Actions */}
                <td className="py-2 px-4 text-center space-x-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 text-sm">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AddedTasks;
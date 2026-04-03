// TaskList.jsx
import React from "react";
import { Link } from "react-router";

const tasks = [
  {
    id: 1,
    task_title: "Watch YouTube video and comment",
    buyer_name: "John Doe",
    completion_date: "2026-04-20",
    payable_amount: 10,
    required_workers: 50,
  },
  {
    id: 2,
    task_title: "Like Instagram Post",
    buyer_name: "Alice Smith",
    completion_date: "2026-04-18",
    payable_amount: 5,
    required_workers: 30,
  },
  {
    id: 3,
    task_title: "App Download & Review",
    buyer_name: "Michael Lee",
    completion_date: "2026-04-25",
    payable_amount: 8,
    required_workers: 100,
  },
];

const TaskList = () => {
  return (
    <div className="p-6">
      
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">Available Tasks</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            {/* Top */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {task.task_title}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                Buyer: <span className="font-medium">{task.buyer_name}</span>
              </p>

              <p className="text-sm text-gray-500">
                Deadline:{" "}
                <span className="font-medium">
                  {task.completion_date}
                </span>
              </p>
            </div>

            {/* Middle Info */}
            <div className="mt-4 space-y-1">
              <p className="text-sm">
                💰 Pay:{" "}
                <span className="text-green-600 font-semibold">
                  {task.payable_amount} Coins
                </span>
              </p>

              <p className="text-sm">
                👥 Workers Needed:{" "}
                <span className="font-semibold">
                  {task.required_workers}
                </span>
              </p>
            </div>

            {/* Button */}
            <button className="mt-4 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
                <Link to={`/tasks/task-details`}>
                View Details
                </Link>
              
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TaskList;
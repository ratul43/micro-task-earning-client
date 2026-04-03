// TaskDetails.jsx
import React from "react";
import { useForm } from "react-hook-form";

const TaskDetails = () => {
  const { register, handleSubmit, reset } = useForm();

  // Dummy Task Data
  const task = {
    task_id: "12345",
    task_title: "Watch YouTube video and comment",
    task_detail: "Watch the full video and leave a meaningful comment.",
    payable_amount: 10,
    required_workers: 50,
    completion_date: "2026-04-20",
    submission_info: "Submit screenshot of your comment",
    task_image_url: "https://via.placeholder.com/400x200",
    buyer_name: "John Doe",
    buyer_email: "john@example.com",
  };

  // Dummy Worker Info (replace later)
  const worker = {
    worker_name: "Your Name",
    worker_email: "worker@example.com",
  };

  const onSubmit = (data) => {
    const submissionData = {
      task_id: task.task_id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: worker.worker_email,
      worker_name: worker.worker_name,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      submission_details: data.submission_details,
      current_date: new Date().toISOString(),
      status: "pending",
    };

    console.log(submissionData);
    alert("Submission sent (UI only)");

    reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      
      {/* Task Info Card */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        
        <img
          src={task.task_image_url}
          alt="task"
          className="w-full h-60 object-cover rounded-md mb-4"
        />

        <h2 className="text-2xl font-bold mb-2">
          {task.task_title}
        </h2>

        <p className="text-gray-600 mb-4">
          {task.task_detail}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            👤 Buyer: <span className="font-medium">{task.buyer_name}</span>
          </p>

          <p>
            📅 Deadline:{" "}
            <span className="font-medium">{task.completion_date}</span>
          </p>

          <p>
            💰 Pay:{" "}
            <span className="text-green-600 font-semibold">
              {task.payable_amount} Coins
            </span>
          </p>

          <p>
            👥 Workers Needed:{" "}
            <span className="font-medium">
              {task.required_workers}
            </span>
          </p>

          <p className="md:col-span-2">
            📌 Submission Info:{" "}
            <span className="font-medium">
              {task.submission_info}
            </span>
          </p>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        
        <h3 className="text-xl font-bold mb-4">
          Submit Your Work
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <textarea
            placeholder="Enter your submission details (e.g. screenshot link, proof, etc.)"
            {...register("submission_details", {
              required: "Submission details are required",
            })}
            className="w-full border p-3 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Submit Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
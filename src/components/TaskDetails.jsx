// TaskDetails.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { apiFetch } from "../apiService";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const { register, handleSubmit, reset } = useForm();
  const {taskId} = useParams()
  const [task, setTask] = useState({})
  // console.log(taskId);

  useEffect(()=>{
    (async()=>{
      await apiFetch(`/tasks/details?id=${taskId}`)
      .then(data => setTask(data))
    })()
  }, [taskId])


  // Dummy Worker Info (replace later)
  const worker = {
    worker_name: "Your Name",
    worker_email: "worker@example.com",
  };

  const onSubmit = async (data) => {
    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: worker.worker_email,
      worker_name: worker.worker_name,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      submission_details: data.submission_details,
      submission_date: new Date().toISOString(),
      status: "pending",
    };

    // console.log(submissionData);

    await apiFetch(`/tasks/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    }).then(()=>{
      toast.success("Task submitted successfully!. Waiting for buyer's review.")
    }).catch((error)=>{
      toast.error("Failed to submit task. Please try again.");
      console.error("Submission error:", error);  
    })


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
import React from "react";
import { useForm } from "react-hook-form";
import { apiFetch } from "../../apiService";
import { toast } from "react-toastify";

const AddTask = ({ availableCoins = 200 }) => {
  const { register, handleSubmit, watch, reset, formState: {errors} } = useForm();

  const requiredWorkers = watch("required_workers") || 0;
  const payableAmount = watch("payable_amount") || 0;

  const totalCost = requiredWorkers * payableAmount;

  const onSubmit = async (data) => {
    if (totalCost > availableCoins) {
      const userConfirmed =  confirm("Don't have enough coins to post this task. Please purchase more coins to proceed. Do you want to purchase coins now?") 
      if (userConfirmed) {
      window.location.href = "/purchase-coins"; // redirect
      return;
    }
  }
    

    try {
      const response = await apiFetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...data, totalCost}),
        // buyer name, buyer_email, task_id, 
      });

      // console.log(response);

      toast.success("Task Added Successfully");
      reset(); // Clear form after successful submission


    } 
    catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Task Title"
            {...register("task_title", { required: "Name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.task_title && (
            <p className="text-red-500 text-sm">{errors.task_title.message}</p>
          )}
        </div>

        {/* Details */}
        <div>
          <label className="block font-medium mb-1">Details</label>
          <textarea
            placeholder="Task Detail Description"
            {...register("task_detail", { required: "Details are required" })}
            className="w-full border p-2 rounded"
          />
          {errors.task_detail && (
            <p className="text-red-500 text-sm">{errors.task_detail.message}</p>
          )}
        </div>

        {/* Workers */}
        <div>
          <label className="block font-medium mb-1">Required Workers</label>
          <input
            type="number"
            placeholder="Required Workers (e.g. 100)"
            {...register("required_workers", { required: "Required workers is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.required_workers && (
            <p className="text-red-500 text-sm">{errors.required_workers.message}</p>
          )}
        </div>

        {/* Payable Amount */}
        <div>
          <label className="block font-medium mb-1">
            Payable Amount per Worker
          </label>
          <input
            type="number"
            placeholder="Payable Amount per Worker (e.g. 10)"
            {...register("payable_amount", { required: "Payable amount is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.payable_amount && (
            <p className="text-red-500 text-sm">{errors.payable_amount.message}</p>
          )}
        </div>

        {/* Completion Date */}
        <div>
          <label className="block font-medium mb-1">Completion Date</label>
          <input
            type="date"
            {...register("completion_date", { required: "Completion date is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.completion_date && (
            <p className="text-red-500 text-sm">{errors.completion_date.message}</p>
          )}
        </div>

        {/* Submission Info */}
        <div>
          <label className="block font-medium mb-1">Submission Info</label>
          <input
            type="text"
            placeholder="Submission Info (e.g. screenshot proof)"
            {...register("submission_info", { required: "Submission info is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.submission_info && (
            <p className="text-red-500 text-sm">{errors.submission_info.message}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            placeholder="Task Image URL"
            {...register("task_image_url", { required: "Image URL is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.task_image_url && (
            <p className="text-red-500 text-sm">{errors.task_image_url.message}</p>
          )}
        </div>

        {/* Total Cost Display */}
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="font-semibold">
            Total Cost: {requiredWorkers} × {payableAmount} ={" "}
            <span className="text-blue-600">{totalCost} coins</span>
          </p>
          <p className="text-sm text-gray-500">
            Available Coins: {availableCoins}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;

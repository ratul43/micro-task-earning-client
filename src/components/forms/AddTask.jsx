import React from "react";
import { useForm } from "react-hook-form";

const AddTask = ({ availableCoins = 200 }) => {
  const { register, handleSubmit, watch } = useForm();

  const requiredWorkers = watch("required_workers") || 0;
  const payableAmount = watch("payable_amount") || 0;

  const totalCost = requiredWorkers * payableAmount;

  const onSubmit = (data) => {
    if (totalCost > availableCoins) {
      alert("Not available Coin. Purchase Coin");
      window.location.href = "/purchase-coins"; // redirect
      return;
    }

    console.log({ ...data, totalCost });
    alert("Task Added Successfully (UI only)");
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
          {...register("task_title", { required: true })}
          className="w-full border p-2 rounded"
        />

            </div>
       

        {/* Detail */}
        <div>
            <label className="block font-medium mb-1">Detail</label>
             <textarea
          placeholder="Task Detail Description"
          {...register("task_detail", { required: true })}
          className="w-full border p-2 rounded"
        />
        </div>
       

        {/* Workers */}
        <div>
            <label className="block font-medium mb-1">Required Workers</label>
            <input
          type="number"
          placeholder="Required Workers (e.g. 100)"
          {...register("required_workers", { required: true })}
          className="w-full border p-2 rounded"
        />
        </div>
        

        {/* Payable Amount */}
        <div>
            <label className="block font-medium mb-1">Payable Amount per Worker</label>
          <input
          type="number"
          placeholder="Payable Amount per Worker (e.g. 10)"
          {...register("payable_amount", { required: true })}
          className="w-full border p-2 rounded"
        />  
        </div>
        

        {/* Completion Date */}
        <div>
            <label className="block font-medium mb-1">Completion Date</label>
          <input
          type="date"
          {...register("completion_date", { required: true })}
          className="w-full border p-2 rounded"
        />  
        </div>
        

        {/* Submission Info */}
        <div>
            <label className="block font-medium mb-1">Submission Info</label>
            <input
          type="text"
          placeholder="Submission Info (e.g. screenshot proof)"
          {...register("submission_info", { required: true })}
          className="w-full border p-2 rounded"
        />
        </div>

        {/* Image URL */}
        <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
          type="text"
          placeholder="Task Image URL"
          {...register("task_image_url", { required: true })}
          className="w-full border p-2 rounded"
        />
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
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
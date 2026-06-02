import React, { use, useContext } from "react";
import { useForm } from "react-hook-form";
import { apiFetch } from "../../apiService";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { UserDataContext } from "../../context/UserDataContext";

const AddTask = () => {
  const { user } = use(AuthContext);
  const { userData, fetchUserData } = useContext(UserDataContext);

  const availableCoins = Number(userData?.coins ?? 0);

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
    else{
      return; // Stop form submission
    }
  }
    

    try {
      await apiFetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...data, totalCost, buyer_email: `${user?.email}`, buyer_name: `${user?.displayName}`}), // Include buyer email and name in task data
        // buyer name, buyer_email,  
      });

      // Deduct coins from buyer's account
      await apiFetch("/users/coins", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          coins: -totalCost, // Negative to deduct
        }),
      });

      // Refresh user data to update coins everywhere
      await fetchUserData();

      // console.log(response);

      toast.success("Task Added Successfully");
      reset(); // Clear form after successful submission


    } 
    catch (err) {
      console.error("Error adding task:", err.message);
      toast.error("Failed to add task. Please try again.");
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
    {...register("required_workers", { 
      required: "Required workers is required",
      valueAsNumber: true,  // 👈 Converts string to number
      min: {
        value: 1,
        message: "Must be at least 1 worker"
      }
    })}
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
          <label className="block font-medium mb-1">Image</label>
         
        </div>
        
        <div>
<>
 <div className="max-w-xl">
  <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
    <span className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <span className="font-medium text-gray-600">
        Drop files to Attach, or
        <span className="text-blue-600 ml-1 underline">browse</span>
      </span>
    </span>
    <input type="file" name="file_upload" className="hidden" />
  </label>
</div>


</>

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

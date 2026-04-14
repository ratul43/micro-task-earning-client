// RegistrationPage.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiFetch } from "../apiService";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  try {
    // This will throw error if email exists
    await apiFetch(`/users/verify?email=${data.email}`);
    
    // If we get here, email doesn't exist
    const newRegistration = await apiFetch(`/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (newRegistration) {
      toast.success("Registration successful! Please log in.");
      reset();
    }
  } catch (error) {
    // Email exists
    toast.error("Email already exists");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block font-medium mb-1">
              Profile Picture URL
            </label>
            <input
              type="text"
              {...register("photo", {
                required: "Profile picture URL is required",
              })}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">{errors.photo.message}</p>
            )}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block font-medium mb-1">Select Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[0-9]).*$/,
                  message:
                    "Password must include at least one uppercase letter and one number",
                },
              })}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;

// RegistrationPage.jsx
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiFetch } from "../apiService";
import { AuthContext } from "./../context/AuthContext";
import { useNavigate } from "react-router";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const RegistrationPage = () => {
  const { registerUser, updateUserProfile } = use(AuthContext);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  // console.log(registerUser);

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    if (!response.ok || !result.data?.url) {
      throw new Error(result.error?.message || "Image upload failed");
    }

    return result.data.url;
  };

  const onSubmit = async (data) => {
    // console.log(data);

    if (!data.photo && !profileImageFile) {
      toast.error("Please provide a profile picture URL or upload an image.");
      return;
    }

    // This will throw error if email exists
    try {
      const verificationResult = await apiFetch(
        `/users/verify?email=${data.email}`,
      );

      if (verificationResult.exists) {
        toast.error("Email already exists");
        return;
      }

      let photoURL = data.photo;
      if (profileImageFile) {
        setUploadingImage(true);
        photoURL = await uploadImageToImgbb(profileImageFile);
      }

      // Register user
      await registerUser(data.email, data.password);

      // Update profile
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL || "https://i.sstatic.net/l60Hf.png",
      };

      await updateUserProfile(userProfile);
      // console.log(update);

      // Save user in database
      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          photo: photoURL,
          role: data.role,
          coins: data.role === "buyer" ? 50 : 10, // Give buyers some starting coins
        }),
      });

      toast.success("Registration successful");
      reset();
      setProfileImageFile(null);
      setProfileImagePreview(null);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploadingImage(false);
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
            
            <div className="mt-3">
              <label className="block font-medium mb-1">Upload Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setProfileImageFile(file);
                  const reader = new FileReader();
                  reader.onload = () => setProfileImagePreview(reader.result);
                  reader.readAsDataURL(file);
                }}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {profileImagePreview && (
                <img
                  src={profileImagePreview}
                  alt="Profile preview"
                  className="mt-3 w-full h-40 object-cover rounded-md border"
                />
              )}
              {uploadingImage && (
                <p className="mt-2 text-sm text-blue-600">Uploading profile image...</p>
              )}
            </div>
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

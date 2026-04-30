// LoginPage.jsx
import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const LoginPage = () => {

  const {signInUser, signInGoogle} = use(AuthContext)
  // console.log(signInUser);

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data); // you will handle login later
    signInUser(data.email, data.password)
      .then((res)=>{
          // console.log(res);
          toast.success("Login successful");
          window.location.href = "/"; // Redirect to home page after successful login
      })
      .catch((error)=>{
          toast.error(error.message);
      })
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res)=>{
          // console.log(res);
          toast.success("Google Sign-In successful");
          // window.location.href = "/"; // Redirect to home page after successful login
          navigate("/")
      })
      .catch((error)=>{
          toast.error(error.message);
      })
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a className="text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In (UI Only) */}
        <button onClick={handleGoogleSignIn}
          type="button"
          className="w-full flex items-center justify-center gap-3 border py-2 rounded-md hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register">
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Register
          </span>
          </Link>
          
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
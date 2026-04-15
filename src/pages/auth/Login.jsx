import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "./validation/registerschema";
import axiosInstance from "../../api/instance";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res);
      localStorage.setItem("token", res.data.token);
       navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-50 p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-7">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <Link to="/">
            <span className="text-gray-900 font-semibold text-lg">Vendora</span>
          </Link>{" "}
        </div>

        <h1 className="text-gray-900 text-2xl font-semibold">Welcome back</h1>
        <p className="text-gray-500 text-sm mt-1 mb-7">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create one free
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={`px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.email ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password ? "border-red-400" : "border-gray-200"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input
              {...register("remember")}
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
            />
            <label htmlFor="remember" className="text-sm text-gray-500">
              Remember me for 30 days
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-indigo-200 mt-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Signing in…
              </>
            ) : (
              "Sign in to Vendora"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          By signing in you agree to our{" "}
          <a href="#" className="underline hover:text-gray-600">
            Terms
          </a>{" "}
          &amp;{" "}
          <a href="#" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import Axios from "../utils/network/axios";
import SummaryApi from "../comman/summaryApi";
import fetchUserDetails from "../utils/auth/fetchUserDetails";
import { setUserDetails } from "../Store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await Axios({
        ...SummaryApi.login,
        data: form
      });

      if (!data?.success) {
        toast.error(data?.message || "Login failed");
        return;
      }

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      const userRes = await fetchUserDetails();
      if (userRes?.success) {
        dispatch(setUserDetails(userRes.data));
      }

      toast.success("Welcome back 👋");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-emerald-50 px-4">
      <div className="relative w-full max-w-md rounded-3xl border border-white/60
                      bg-white/70 backdrop-blur-xl shadow-2xl p-8">

        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl" />

        {/* Brand */}
        <div className="relative text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Read<span className="text-indigo-600">ora</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-5">

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-600">
              EMAIL
            </label>
            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300
                           focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
                           bg-white/80 outline-none text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-600">
              PASSWORD
            </label>
            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300
                           focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
                           bg-white/80 outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r
                       from-indigo-600 to-emerald-600
                       text-white font-semibold tracking-wide
                       hover:opacity-95 transition
                       disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="relative text-center text-sm text-slate-500 mt-6">
          New here?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

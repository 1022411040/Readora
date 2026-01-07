import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import Axios from "../utils/network/axios";
import SummaryApi from "../comman/summaryApi";
import fetchUserDetails from "../utils/auth/fetchUserDetails";
import { setUserDetails } from "../Store/userSlice";

/* ================= REGEX ================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= PASSWORD STRENGTH ================= */
  const rules = [
    (p) => p.length >= 8,
    (p) => /[A-Z]/.test(p),
    (p) => /[a-z]/.test(p),
    (p) => /\d/.test(p),
    (p) => /[@$!%*?&]/.test(p)
  ];

  const strengthScore = rules.filter(r => r(form.password)).length;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password)
      return toast.error("All fields are required");

    if (!emailRegex.test(form.email))
      return toast.error("Enter a valid email address");

    if (strengthScore < 4)
      return toast.error("Password is too weak");

    try {
      setLoading(true);

      const { data } = await Axios({
        ...SummaryApi.register,
        data: form
      });

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      const userRes = await fetchUserDetails();
      if (userRes?.success) dispatch(setUserDetails(userRes.data));

      toast.success("Welcome to Readora");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-linear-to-br from-indigo-50 via-white to-emerald-50">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative w-full max-w-md rounded-3xl
                   bg-white/70 backdrop-blur-xl
                   border border-white/60
                   shadow-2xl p-8 overflow-hidden"
      >
        {/* Ambient glows */}
        <div className="absolute -top-24 -right-24 w-56 h-56
                        bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56
                        bg-emerald-400/20 rounded-full blur-3xl" />

        {/* Header */}
        <div className="relative text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Read<span className="text-indigo-600">ora</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-5">

          <Input
            label="Full name"
            placeholder="John Doe"
            icon={<FiUser />}
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email address"
            placeholder="you@example.com"
            icon={<FiMail />}
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            placeholder="Create a strong password"
            icon={<FiLock />}
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          {/* Password strength */}
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      strengthScore >= i
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Use a strong password to secure your account
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl
                       bg-linear-to-r from-indigo-600 to-emerald-600
                       text-white font-semibold tracking-wide
                       transition-all
                       hover:shadow-xl hover:scale-[1.01]
                       active:scale-[0.99]
                       disabled:opacity-60
                       cursor-pointer"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="relative text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

/* ================= INPUT ================= */

const Input = ({
  label,
  icon,
  value,
  rightIcon,
  placeholder,
  ...props
}) => {
  const active = value?.length > 0;

  return (
    <motion.div
      animate={{ y: active ? -2 : 0 }}
      className="space-y-1"
    >
      <label className="text-xs font-semibold text-slate-600">
        {label}
      </label>

      <div
        className={`relative rounded-xl transition-all
          ${active
            ? "bg-white shadow-md ring-1 ring-indigo-200"
            : "bg-white/70"
          }`}
      >
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <input
          {...props}
          value={value}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl
                     bg-transparent border border-slate-300
                     placeholder:text-slate-400
                     focus:border-indigo-500
                     focus:ring-4 focus:ring-indigo-100
                     outline-none text-sm transition
                     caret-indigo-600
                     cursor-pointer"
        />

        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>
    </motion.div>
  );
};

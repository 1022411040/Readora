import React from "react";
import { FiHome, FiSearch, FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg w-full">

        {/* CARD */}
        <div
          className="bg-white border border-slate-200 rounded-4xl
                     shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]
                     p-10 text-center space-y-8"
        >
          {/* ICON */}
          <div className="mx-auto w-20 h-20 rounded-3xl
                          bg-indigo-50 text-indigo-600
                          flex items-center justify-center">
            <FiAlertTriangle className="text-4xl" />
          </div>

          {/* TEXT */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">
              404
            </h1>
            <p className="text-lg font-semibold text-slate-800">
              Page not found
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              The page you’re looking for doesn’t exist or was moved.
              Please check the URL or use one of the options below.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => navigate("/")}
              className="h-11 px-6 rounded-xl
                         bg-linear-to-r from-indigo-600 to-emerald-600
                         text-white font-semibold
                         flex items-center justify-center gap-2
                         hover:opacity-95 transition"
            >
              <FiHome />
              Go to dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="h-11 px-6 rounded-xl
                         bg-slate-100 text-slate-700 font-medium
                         flex items-center justify-center gap-2
                         hover:bg-slate-200 transition"
            >
              <FiSearch />
              Go back
            </button>
          </div>
        </div>

        {/* FOOT NOTE */}
        <p className="text-center text-xs text-slate-400 mt-6">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;

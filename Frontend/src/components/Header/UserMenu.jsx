import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

function UserMenu() {
  const [open, setOpen] = useState(false);

  // ✅ correct selector for your store
  const user = useSelector((state) => state.user.user);

  // ✅ safe initial extraction
  const initial = user?.name
    ? user.name.trim().charAt(0).toUpperCase()
    : "U";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="hover:border-blue-500
                   transition cursor-pointer border border-slate-300 p-1 rounded-full"
      >
        <div
          className="w-8 h-8 rounded-full
                     bg-linear-to-br from-blue-500 to-indigo-500
                     text-white flex items-center justify-center
                     text-sm font-semibold"
        >
          {initial}
        </div>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48
                     bg-white border border-gray-200
                     rounded-xl shadow-lg overflow-hidden"
        >
          <Link
            to="/dashboard"
            className="flex items-center gap-2
                       px-4 py-3 text-sm hover:bg-gray-50"
          >
            <FiUser />
            Profile
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-2
                       px-4 py-3 text-sm
                       hover:bg-red-50 text-red-600"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;

import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

function MobileMenu({ open, onClose }) {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40
                    bg-black/30 backdrop-blur-sm
                    transition-opacity duration-300
                    ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* PANEL */}
      <aside
        className={`fixed top-0 right-0 z-50
                    h-full w-[85%] max-w-sm
                    bg-white shadow-xl
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="h-16 px-5 flex items-center justify-between
                        border-b border-slate-200">
          <span className="font-semibold text-slate-900">
            Menu
          </span>
          <button
            onClick={onClose}
            className="text-2xl text-slate-600 hover:text-slate-900 transition"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        {/* CONTENT */}
        <nav className="px-6 py-6 flex flex-col gap-5 text-base font-medium">
          <Link onClick={onClose} to="/ebooks" className="hover:text-indigo-600">
            Library
          </Link>
          <Link onClick={onClose} to="/categories" className="hover:text-indigo-600">
            Categories
          </Link>
          <Link onClick={onClose} to="/dashboard" className="hover:text-indigo-600">
            Dashboard
          </Link>
          <Link onClick={onClose} to="/profile" className="hover:text-indigo-600">
            Profile
          </Link>
        </nav>
      </aside>
    </>
  );
}

export default MobileMenu;

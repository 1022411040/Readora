import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const SearchableSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select"
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o._id === value);
  const filtered = options.filter((o) =>
    o.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-4
                   rounded-xl border border-slate-300
                   bg-white flex items-center justify-between
                   focus:ring-4 focus:ring-indigo-100"
      >
        <span className={selected ? "text-slate-900" : "text-slate-400"}>
          {selected?.name || placeholder}
        </span>
        <FiChevronDown />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full
                        rounded-2xl border border-slate-200
                        bg-white shadow-xl overflow-hidden">
          <div className="p-2 border-b flex items-center gap-2">
            <FiSearch className="text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search category..."
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="p-4 text-sm text-slate-500">
                No categories found
              </p>
            )}

            {filtered.map((opt) => (
              <button
                key={opt._id}
                onClick={() => {
                  onChange(opt._id);
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full text-left px-4 py-2
                           hover:bg-indigo-50 transition"
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;

import { FiSearch } from "react-icons/fi";

function HeaderSearch() {
  return (
    <div className="relative w-full max-w-xl">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

      <input
        type="text"
        placeholder="Search books, authors, skills…"
        className="
          w-full
          pl-12 pr-4 py-3
          rounded-full
          bg-slate-50
          border border-slate-200
          text-sm
          focus:bg-white
          focus:border-indigo-500
          focus:ring-4 focus:ring-indigo-100
          outline-none
          transition
        "
      />
    </div>
  );
}

export default HeaderSearch;

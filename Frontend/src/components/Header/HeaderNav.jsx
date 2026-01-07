import { Link } from "react-router-dom";
import {
  FiCompass,
  FiGrid,
  FiBookmark
} from "react-icons/fi";

const navItems = [
  {
    label: "Explore",
    icon: <FiCompass />,
    to: "/ebooks"
  },
  {
    label: "Categories",
    icon: <FiGrid />,
    to: "/category/book"
  },
  {
    label: "Library",
    icon: <FiBookmark />,
    to: "/library"
  }
];

function HeaderNav() {
  return (
    <nav className="hidden lg:flex items-center gap-6 text-slate-600">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="group flex items-center gap-2 text-sm font-medium
                     hover:text-slate-900 transition"
        >
          <span className="text-lg text-slate-500 group-hover:text-indigo-600">
            {item.icon}
          </span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default HeaderNav;

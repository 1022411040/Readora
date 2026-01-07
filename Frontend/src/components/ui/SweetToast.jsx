import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiX
} from "react-icons/fi";
import toast from "react-hot-toast";

const VARIANTS = {
  success: {
    icon: FiCheckCircle,
    border: "border-emerald-200",
    bg: "bg-white/80",
    iconColor: "text-emerald-600"
  },
  error: {
    icon: FiXCircle,
    border: "border-red-200",
    bg: "bg-white/90",
    iconColor: "text-red-600"
  },
  warning: {
    icon: FiAlertTriangle,
    border: "border-amber-200",
    bg: "bg-white/90",
    iconColor: "text-amber-600"
  }
};

const SweetToast = ({ t, title, description, variant = "success" }) => {
  const config = VARIANTS[variant];
  const Icon = config.icon;

  return (
    <div
      className={`
        relative w-88 rounded-2xl
        ${config.bg} backdrop-blur-xl
        border ${config.border}
        shadow-[0_25px_40px_-15px_rgba(0,0,0,0.25)]
        px-5 py-4 transition-all
        ${t.visible ? "animate-enter" : "animate-leave"}
      `}
    >
      <div className="flex gap-3 items-center">
        <Icon className={`${config.iconColor} text-2xl`} />

        <div className="flex-1">
          <p className="font-semibold text-slate-900">{title}</p>
          {description && (
            <p className="text-sm text-slate-500 mt-0.5">
              {description}
            </p>
          )}
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-slate-400 hover:text-slate-700 transition"
          aria-label="Dismiss"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default SweetToast;

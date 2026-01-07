import { FiAlertTriangle } from "react-icons/fi";

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
  danger = false
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onCancel}
      />

      {/* MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md
                  rounded-2xl bg-white
                  shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]
                  border border-slate-200
                  overflow-hidden
                  animate-[dialogEnter_.2s_cubic-bezier(.2,.8,.2,1)]"
      >
        {/* TOP STATUS BAR */}
        <div
          className={`h-1.5 w-full
            ${
              danger
                ? "bg-linear-to-r from-red-500 via-red-600 to-red-500"
                : "bg-linear-to-r from-indigo-500 via-emerald-500 to-indigo-500"
            }`}
        />

        {/* HEADER */}
        <div className="relative px-7 pt-7">
          {/* SUBTLE GLOW (toned down) */}
          <div
            aria-hidden
            className={`absolute -top-12 left-6 w-28 h-28 rounded-full blur-3xl opacity-25
              ${danger ? "bg-red-400" : "bg-indigo-400"}`}
          />

          {/* ICON */}
          <div
            className={`relative w-14 h-14 rounded-xl
                        flex items-center justify-center
              ${
                danger
                  ? "bg-red-100 text-red-600"
                  : "bg-indigo-100 text-indigo-600"
              }`}
          >
            <FiAlertTriangle className="text-2xl" />
          </div>
        </div>

        {/* BODY */}
        <div className="px-7 pt-4 pb-6 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 leading-snug">
            {title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {message}
          </p>

          {/* CONTEXT NOTE */}
          <p className="text-xs text-slate-400">
            This action may affect existing platform data.
          </p>
        </div>

        {/* FOOTER */}
        <div className="px-7 py-4 bg-slate-50 border-t border-slate-200
                        flex justify-end gap-3">
          {cancelText && (
            <button
              onClick={onCancel}
              disabled={loading}
              className="h-10 px-5 rounded-lg
                        bg-white border border-slate-300
                        text-slate-700 text-sm font-medium
                        hover:bg-slate-100
                        focus:outline-none focus:ring-2 focus:ring-slate-300
                        disabled:opacity-50 cursor-pointer"
            >
              {cancelText}
            </button>
          )}

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`h-10 px-6 rounded-lg
                        flex items-center gap-2
                        text-sm font-semibold text-white
                        focus:outline-none focus:ring-2
                        cursor-pointer
              ${
                danger
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-300"
                  : "bg-linear-to-r from-indigo-600 to-emerald-600 focus:ring-indigo-300"
              }
              transition disabled:opacity-60`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {confirmText}
          </button>
        </div>
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes dialogEnter {
            from {
              opacity: 0;
              transform: translateY(24px) scale(0.92);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmDialog;

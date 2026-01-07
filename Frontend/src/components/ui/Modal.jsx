import { useEffect } from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md mx-4
                   rounded-3xl bg-white
                   shadow-2xl border border-slate-200
                   animate-scaleIn"
      >

        {children}
      </div>
    </div>
  );
};

export default Modal;

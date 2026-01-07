import { FiCheckCircle } from "react-icons/fi";

const UploadSuccessModal = ({ onClose }) => {
  return (
    <div className="px-8 py-10 text-center">
      <FiCheckCircle className="mx-auto text-5xl text-emerald-600" />

      <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
        Ebook Uploaded
      </h2>

      <p className="mt-2 text-slate-500 flex flex-col items-center justify-center font-bold">
        Your ebook has been successfully added to the <span className="flex">E-library</span>.
      </p>

      <button
        onClick={onClose}
        className="mt-1 w-full h-12 rounded-xl
                   bg-linear-to-r from-indigo-600 to-emerald-600
                   text-white font-semibold
                   hover:opacity-95 transition cursor-pointer"
      >
        Done
      </button>
    </div>
  );
};

export default UploadSuccessModal;

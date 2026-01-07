import { useEffect, useState, useRef } from "react";
import {
  FiUploadCloud,
  FiFileText,
  FiLoader,
  FiShield,
  FiDatabase,
  FiGlobe,
  FiImage,
  FiTag
} from "react-icons/fi";
import toast from "react-hot-toast";
import Axios from "../../utils/network/axios";
import SummaryApi from "../../comman/summaryApi";
import SearchableSelect from "../../components/ui/SearchableSelect";
import Modal from "../../components/ui/Modal";
import UploadSuccessModal from "../../components/ui/UploadSuccessModal";

const UploadEbook = () => {
  const ebookInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    language: "en",
    tags: [],
    access: "free",
    status: "published",
    previewEnabled: true,
    previewPages: 5
  });

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await Axios(SummaryApi.getCategories);
        if (data?.success) setCategories(data.data);
      } catch {
        toast.error("Unable to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  /* ================= FILE HANDLERS ================= */
  const handleEbookFile = (file) => {
    if (!file) return;

    if (!["application/pdf", "application/epub+zip"].includes(file.type)) {
      toast.error("Only PDF or EPUB files are supported");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be under 50MB");
      return;
    }

    setFile(file);
  };

  const handleCoverImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    setCoverImage(file);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !form.title || !form.author || !form.category) {
      toast.error("Please complete all required fields");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("language", form.language);
    formData.append("access", form.access);
    formData.append("status", form.status);

    form.tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    formData.append("preview[enabled]", form.previewEnabled);
    formData.append("preview[pages]", form.previewPages);

    formData.append("ebook", file);
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      setUploading(true);
      setProgress(0);

      const { data } = await Axios({
        ...SummaryApi.uploadEbook,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (!e.total) return;
          setProgress(Math.min(Math.round((e.loaded * 100) / e.total), 95));
        }
      });

      if (data?.success) {
        setProgress(100);
        setTimeout(() => setShowSuccess(true), 300);
        resetForm();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 800);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      author: "",
      description: "",
      category: "",
      language: "en",
      tags: [],
      access: "free",
      status: "published",
      previewEnabled: true,
      previewPages: 5
    });
    setFile(null);
    setCoverImage(null);
    if (ebookInputRef.current) ebookInputRef.current.value = "";
    if (coverInputRef.current) coverInputRef.current.value = "";
  };

  return (
    <>
      <Modal open={showSuccess} onClose={() => setShowSuccess(false)}>
        <UploadSuccessModal onClose={() => setShowSuccess(false)} />
      </Modal>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-14">

        {/* ================= HEADER ================= */}
        <div className="border border-slate-200 py-5 px-7 mb-10 rounded-2xl">
          <h1 className="text-3xl  font-bold text-slate-900">
            Publish a new ebook
          </h1>
          <p className="text-slate-500 mt-1 font-bold">
            Upload your ebook, define access, and make it available on the platform.
          </p>
        </div>

        {/* ================= INFO ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <InfoCard icon={<FiDatabase />} title="File limit" value="50 MB maximum" />
          <InfoCard icon={<FiFileText />} title="Supported formats" value="PDF, EPUB" />
          <InfoCard icon={<FiShield />} title="Access control" value="Role-based" />
          <InfoCard icon={<FiGlobe />} title="Visibility" value="Admin managed" />
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="rounded-4xl bg-white shadow-lg border border-slate-200 px-7 py-7 lg:px-10 lg:py-12 lg:space-y-12">

          {/* FILE UPLOAD */}
          <Section title="Ebook file">
            <DropZone
              file={file}
              onFile={handleEbookFile}
              inputRef={ebookInputRef}
              placeholder="Drag & drop PDF or EPUB here, or click to browse"
            />
          </Section>

          {/* PROGRESS */}
          {uploading && (
            <div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-indigo-600 to-emerald-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-right">
                {progress < 100 ? "Uploading…" : "Finalizing…"}
              </p>
            </div>
          )}

          {/* DETAILS */}
          <Section title="Ebook details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SoftInput
                label="Title"
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
              />
              <SoftInput
                label="Author"
                value={form.author}
                onChange={(v) => setForm({ ...form, author: v })}
              />
            </div>

            <SoftTextarea
              label="Description"
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loadingCategories ? (
                <Skeleton />
              ) : (
                <SearchableSelect
                  label="Category"
                  options={categories}
                  value={form.category}
                  onChange={(val) => setForm({ ...form, category: val })}
                />
              )}

              <TagInput
                tags={form.tags}
                onChange={(tags) => setForm({ ...form, tags })}
              />
            </div>
          </Section>

          {/* ACCESS */}
          <Section title="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

              {/* LEFT: Access controls */}
              <div className="space-y-6 bg-slate-100 w-full h-full px-4 py-4 rounded-2xl">
                <AccessSelector
                  value={form.access}
                  onChange={(v) => setForm({ ...form, access: v })}
                />

                <StatusSelector
                  value={form.status}
                  onChange={(v) => setForm({ ...form, status: v })}
                />

                <PreviewControls
                  enabled={form.previewEnabled}
                  pages={form.previewPages}
                  onToggle={(v) => setForm({ ...form, previewEnabled: v })}
                  onPages={(v) => setForm({ ...form, previewPages: v })}
                />
              </div>

              {/* RIGHT: Cover image */}
              <div className="pt-1 h-full">
                <CoverUploader
                  onFile={handleCoverImage}
                  inputRef={coverInputRef}
                  file={coverImage}
                />
              </div>

            </div>
          </Section>

          {/* SUBMIT */}
          <button
            disabled={uploading}
            onClick={handleSubmit}
            className="w-full h-14 rounded-2xl
                       bg-linear-to-r from-indigo-600 to-emerald-600
                       text-white font-semibold text-lg
                       flex items-center justify-center gap-3
                       hover:opacity-95 transition
                       disabled:opacity-60 mt-3 cursor-pointer"
          >
            {uploading ? <FiLoader className="animate-spin" /> : <FiUploadCloud />}
            Publish ebook
          </button>

        </div>
      </div>
    </>
  );
};

export default UploadEbook;

/* ================= UI COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div className="space-y-6">
    <h2 className="text-lg font-medium text-slate-900 mb-3">{title}</h2>
    {children}
  </div>
);

const SoftInput = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm text-slate-600">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 h-11 rounded-xl
                 bg-slate-50 px-4
                 focus:bg-white focus:ring-2
                 focus:ring-indigo-200 outline-none border border-gray-300"
    />
  </div>
);

const SoftTextarea = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm text-slate-600">{label}</label>
    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 rounded-xl
                 bg-slate-50 px-4 py-3
                 focus:bg-white focus:ring-2
                 focus:ring-indigo-200 outline-none border border-gray-300"
    />
  </div>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="rounded-2xl bg-white border border-slate-200 p-6 flex gap-4">
    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 text-xl w-fit">
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500">{title}</p>
      <p className="font-medium text-slate-900">{value}</p>
    </div>
  </div>
);

const DropZone = ({ file, onFile, inputRef, placeholder }) => (
  <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      onFile(e.dataTransfer.files[0]);
    }}
    className="rounded-2xl border-2 border-dashed border-slate-300
               p-10 text-center bg-slate-50
               hover:border-indigo-400 transition"
  >
    {!file ? (
      <>
        <FiUploadCloud className="mx-auto text-4xl text-slate-400" />
        <p className="mt-3 text-slate-600">{placeholder}</p>
        <label className="inline-block mt-5 cursor-pointer">
          <span className="px-6 py-2 rounded-xl
                           bg-linear-to-r from-indigo-600 to-emerald-600
                           text-white font-medium">
            Browse file
          </span>
          <input
            ref={inputRef}
            type="file"
            hidden
            accept=".pdf,.epub"
            onChange={(e) => onFile(e.target.files[0])}
          />
        </label>
      </>
    ) : (
      <p className="font-medium text-slate-900">{file.name}</p>
    )}
  </div>
);

const TagInput = ({ tags, onChange }) => (
  <div className="flex flex-col items-start justify-between">
    <label className="text-sm text-slate-600 flex items-center gap-2">
      <FiTag /> Tags
    </label>
    <input
      value={tags.join(", ")}
      placeholder="comma separated"
      onChange={(e) =>
        onChange(
          e.target.value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        )
      }
      className="w-full mt-1 h-12 rounded-xl
                 bg-slate-50 px-4
                 focus:bg-white focus:ring-2
                 focus:ring-indigo-200 outline-none
                 border border-slate-300"
    />
  </div>
);

const AccessSelector = ({ value, onChange }) => (
  <div>
    <label className="text-sm text-slate-600">Access level</label>
    <div className="flex gap-4 mt-2">
      {["free", "semi", "restricted"].map((v) => (
        <button
          type="button"
          key={v}
          onClick={() => onChange(v)}
          className={`px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 cursor-pointer
            ${
              value === v
                ? "bg-linear-to-r from-indigo-600 to-emerald-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
        >
          {v}
        </button>
      ))}
    </div>
  </div>
);

const StatusSelector = ({ value, onChange }) => (
  <div className="w-full">
    <label className="text-sm text-slate-600">Publication status</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 h-11 rounded-xl
                 bg-slate-50 px-4
                 focus:bg-white focus:ring-2
                 focus:ring-indigo-200 outline-none border border-gray-300"
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
    </select>
  </div>
);

const PreviewControls = ({ enabled, pages, onToggle, onPages }) => (
  <div className="flex items-center gap-3 w-full">
    <label className="flex items-center gap-2 text-sm text-slate-600">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onToggle(e.target.checked)}
      />
      Enable preview
    </label>
    {enabled && (
      <input
        type="number"
        min={1}
        max={50}
        value={pages}
        onChange={(e) => onPages(Number(e.target.value))}
        className="w-24 h-10 rounded-xl bg-slate-50 px-3
                   focus:bg-white focus:ring-2
                   focus:ring-indigo-200 outline-none
                   border border-slate-300 mt-1"
      />
    )}
  </div>
);

const CoverUploader = ({ onFile, inputRef, file }) => {
  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFile(e.dataTransfer.files[0]);
        }}
        className={`relative rounded-2xl border-2 border-dashed w-full min-h-65 h-full flex items-center justify-center
          ${file ? "border-indigo-300 bg-white" : "border-slate-300 bg-slate-50"}
          p-6 cursor-pointer hover:border-indigo-400 transition`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => onFile(e.target.files[0])}
        />

        {!file ? (
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl">
              <FiUploadCloud />
            </div>

            <div>
              <p className="font-medium text-slate-800">
                Upload cover image
              </p>
              <p className="text-sm text-slate-500">
                PNG, JPG or WEBP • Recommended 1600×2400
              </p>
            </div>

            <span className="mt-2 inline-block px-5 py-2 rounded-xl
              bg-linear-to-r from-indigo-600 to-emerald-600
              text-white text-sm font-medium">
              Browse image
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <img
              src={previewUrl}
              alt="Cover preview"
              className="w-24 h-32 object-cover rounded-xl border"
            />

            <div className="flex-1">
              <p className="font-medium text-slate-900 truncate">
                {file.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Click or drop to replace
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const Skeleton = () => (
  <div className="h-11 rounded-xl bg-slate-100 animate-pulse" />
);

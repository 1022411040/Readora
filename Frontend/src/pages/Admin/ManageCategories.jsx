import { useEffect, useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiEdit,
  FiTag
} from "react-icons/fi";
import Axios from "../../utils/network/axios";
import SummaryApi from "../../comman/summaryApi";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { showToast } from "../../utils/showToast";



/* ================= MAIN ================= */

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [blockedInfo, setBlockedInfo] = useState(null);

  /* ================= FETCH ================= */

  const fetchCategories = async () => {
    setLoadingList(true);
    try {
      const { data } = await Axios(SummaryApi.getCategories);
      if (data?.success) setCategories(data.data);
    } catch {
      showToast({
        title: "Failed to load categories",
        description: "We couldn’t fetch categories from the server.",
        variant: "error"
      });
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= CREATE ================= */

  const createCategory = async () => {
    if (!name.trim()){
        showToast({
          id: "LOAD_CATEGORIES_ERROR",
          title: "Category name required",
          description: "Please enter a valid category name.",
          variant: "error"
        });
      return
    }

    try {
      setCreating(true);
      await Axios({
        ...SummaryApi.createCategory,
        data: { name, description }
      });

      showToast({
        id: "CATEGORY_CREATED",
        title: "Category created",
        description: "Created category will be listed below",
        variant: "success"
      });
      setName("");
      setDescription("");
      fetchCategories();
    } catch (err) {
      showToast({
        id: "CATEGORY_CREATION_FAILED",
        title: "Failed to create category",
        description: "Please try Again!",
        variant: "error"
      });
    } finally {
      setCreating(false);
    }
  };

  /* ================= UPDATE ================= */

  const saveEdit = async () => {
    if (!editData?.name?.trim()) {
      showToast({
        id: "CATEGORY_CREATION_FAILED_1e",
        title: "Category name required",
        description: "Please Enter all required field",
        variant: "error"
      });
    }

    try {
      await Axios({
        ...SummaryApi.updateCategory(editData._id),
        data: {
          name: editData.name,
          description: editData.description
        }
      });

      showToast({
        id: "CATEGORY_UPDATE_S",
        title: "Category updated",
        description: "Category was updated successfully",
        variant: "success"
      });
      setEditOpen(false);
      setEditData(null);
      fetchCategories();
    } catch (err) {
      showToast({
        id: "CATEGORY_UPDATE_E",
        title: "Update failed",
        description: "Please Try Again!",
        variant: "error"
      });
    }
  };

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    try {
      await Axios(SummaryApi.deleteCategory(selectedCategory._id));

      showToast({
        id: "CATEGORY_Disabled_E",
        title: "Category disabled",
        description: "Category was disabled successfully!",
        variant: "success"
      });
      setConfirmOpen(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (err) {
      const apiError = err?.response?.data;

      if (apiError?.code === "CATEGORY_IN_USE") {
        setConfirmOpen(false);
        setBlockedInfo({
          name: selectedCategory.name,
          count: apiError.data?.linkedEbooksCount || 0
        });
        setSelectedCategory(null);
        return;
      }

      toast.error(apiError?.message || "Failed to disable category");
    }
  };

  return (
    <>
      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={confirmOpen}
        danger
        title="Disable category?"
        message={`"${selectedCategory?.name}" will no longer be available for new ebooks.`}
        confirmText="Disable"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      {/* CATEGORY IN USE */}
      <ConfirmDialog
        open={!!blockedInfo}
        title="Category in use"
        message={
          blockedInfo
            ? `"${blockedInfo.name}" is linked to ${blockedInfo.count} ebook${blockedInfo.count > 1 ? "s" : ""}.
Reassign those ebooks before disabling this category.`
            : ""
        }
        confirmText="Understood"
        onConfirm={() => setBlockedInfo(null)}
        onCancel={() => setBlockedInfo(null)}
      />

      {/* EDIT MODAL */}
      {editOpen && editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
            onClick={() => setEditOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden animate-in fade-in zoom-in">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                Edit Category
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Update category name and description
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-4">
              <SoftInput
                label="Category name"
                value={editData.name}
                onChange={(v) => setEditData({ ...editData, name: v })}
                placeholder="e.g. Technology"
              />

              <SoftInput
                label="Description"
                value={editData.description || ""}
                onChange={(v) =>
                  setEditData({ ...editData, description: v })
                }
                placeholder="Optional short description"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setEditOpen(false)}
                className="h-10 px-5 rounded-lg text-sm font-medium
                          text-slate-700 bg-white border border-slate-300
                          hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="h-10 px-6 rounded-lg text-sm font-semibold text-white
                          bg-linear-to-r from-indigo-600 to-emerald-600
                          hover:opacity-95 shadow-md transition"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="max-w-5xl mx-auto px-6 py-7 space-y-7">
        {/* HEADER */}
        <div className="border border-slate-200 rounded-2xl px-7 py-5">
          <h1 className="text-3xl font-bold text-slate-900">
            Category Management
          </h1>
          <p className="text-slate-500 mt-1">
            Create and manage ebook categories
          </p>
        </div>

        {/* CREATE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <IconBadge icon={<FiTag />} />
            <h2 className="text-lg font-semibold text-slate-900">
              Create new category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SoftInput value={name} onChange={setName} placeholder="Category name" />
            <SoftInput
              value={description}
              onChange={setDescription}
              placeholder="Description (optional)"
            />
            <PrimaryButton loading={creating} icon={<FiPlus />} onClick={createCategory}>
              Add category
            </PrimaryButton>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {loadingList ? (
            <CategorySkeleton />
          ) : categories.length === 0 ? (
            <EmptyState />
          ) : (
            categories.map((cat) => (
              <div
                key={cat._id}
                className="bg-white border border-slate-200 rounded-2xl px-6 py-5
                           flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <IconButton
                    icon={<FiEdit />}
                    onClick={() => {
                      setEditData({ ...cat });
                      setEditOpen(true);
                    }}
                  />
                  <IconButton
                    variant="danger"
                    icon={<FiTrash2 />}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setConfirmOpen(true);
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ManageCategories;

/* ================= UI PRIMITIVES ================= */

const SoftInput = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-11 rounded-xl bg-slate-50 px-4
               border border-slate-300
               focus:bg-white focus:ring-2
               focus:ring-indigo-200 outline-none"
  />
);

const PrimaryButton = ({ children, onClick, icon, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="h-11 rounded-xl
               bg-linear-to-r from-indigo-600 to-emerald-600
               text-white font-semibold
               flex items-center justify-center gap-2
               hover:opacity-95 transition
               disabled:opacity-60 cursor-pointer"
  >
    {loading ? <Spinner /> : icon}
    {children}
  </button>
);

const IconButton = ({ icon, onClick, variant = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition cursor-pointer ${styles[variant]}`}
    >
      {icon}
    </button>
  );
};

const IconBadge = ({ icon }) => (
  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600
                  flex items-center justify-center text-xl">
    {icon}
  </div>
);

const Spinner = () => (
  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
);

/* ================= SKELETON / EMPTY ================= */

const CategorySkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-20 rounded-2xl bg-slate-100 animate-pulse"
      />
    ))}
  </div>
);

const EmptyState = () => (
  <div className="border border-dashed border-slate-300 rounded-2xl p-10 text-center text-slate-500">
    No categories created yet
  </div>
);
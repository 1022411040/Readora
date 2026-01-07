import { FiUsers, FiBook, FiUpload, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../../utils/network/axios";
import SummaryApi from "../../comman/summaryApi";
import AdminHomeSkeleton from "./skeletons/AdminHomeSkeleton";

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH DASHBOARD DATA
     ====================== */
  const fetchAdminOverview = async () => {
    try {
      const { data } = await Axios({
        ...SummaryApi.adminOverview
      });

      if (data?.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Admin overview fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminOverview();
  }, []);

  /* ======================
     LOADING STATE
     ====================== */
  if (loading) {
    return <AdminHomeSkeleton />;
  }

  /* ======================
     UI
     ====================== */
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">

      <h1 className="text-3xl font-extrabold text-slate-900">
        Admin Dashboard
      </h1>
      <p className="text-slate-500 mt-1">
        Platform overview & management
      </p>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">

        <AdminStat
          icon={<FiUsers />}
          label="Users"
          value={stats?.totalUsers}
        />

        <AdminStat
          icon={<FiBook />}
          label="Ebooks"
          value={stats?.totalEbooks}
        />

        <AdminStat
          icon={<FiEye />}
          label="Views"
          value={stats?.totalViews}
        />

        <AdminStat
          icon={<FiUpload />}
          label="Uploads"
          value={stats?.totalUploads}
        />

      </section>

      {/* ================= ACTIONS ================= */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">

        <ActionCard
          title="Upload New Ebook"
          desc="Add PDFs or EPUBs to the library"
          to="admin/ebooks/upload"
        />

        <ActionCard
          title="Manage Categories"
          desc="Edit & organize content"
          to="admin/categories"
        />

      </section>
    </div>
  );
};

export default AdminHome;

/* ================= COMPONENTS ================= */

const AdminStat = ({ icon, label, value }) => (
  <div className="rounded-2xl bg-white border border-slate-200 p-6
                  flex items-center gap-4 shadow-sm hover:shadow-md transition">
    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 text-xl">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900">
        {value ?? "—"}
      </p>
    </div>
  </div>
);

const ActionCard = ({ title, desc, to }) => (
  <Link
    to={to}
    className="block rounded-2xl border border-slate-200 bg-white p-6
               hover:shadow-lg hover:-translate-y-0.5 transition"
  >
    <h3 className="font-semibold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 mt-1">{desc}</p>
  </Link>
);

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPermission = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // 🔹 Still checking auth (user not loaded yet)
  if (isAuthenticated && !user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-slate-500 text-sm">Checking permissions…</p>
      </div>
    );
  }

  // 🔹 Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Logged in but not admin
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin verified
  return <Outlet />;
};

export default AdminPermission;

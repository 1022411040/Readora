const AdminHomeSkeleton = () => {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto animate-pulse">
      <div className="h-8 w-64 bg-slate-200 rounded mb-3" />
      <div className="h-4 w-96 bg-slate-200 rounded mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHomeSkeleton;

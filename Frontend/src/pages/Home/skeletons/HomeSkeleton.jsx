const HomeSkeleton = () => {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto space-y-8 animate-pulse">
      <div className="h-32 bg-slate-200 rounded-3xl" />
      <div className="grid grid-cols-3 gap-6">
        <div className="h-24 bg-slate-200 rounded-xl" />
        <div className="h-24 bg-slate-200 rounded-xl" />
        <div className="h-24 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
};

export default HomeSkeleton;

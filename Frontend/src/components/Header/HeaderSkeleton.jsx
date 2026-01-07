function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5">
        <div className="h-18 flex items-center justify-between">

          {/* Brand */}
          <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />

          {/* Search */}
          <div className="hidden lg:block h-10 w-105 bg-slate-200 rounded-full animate-pulse" />

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-9 w-24 bg-slate-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderSkeleton;

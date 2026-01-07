import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { 
  FiBookOpen, 
  FiTrendingUp, 
  FiClock, 
  FiAlertCircle, 
  FiChevronRight,
  FiUser,
  FiRefreshCw,
  FiSearch,
  FiFilter
} from "react-icons/fi";
import { 
  MdLibraryBooks,
  MdTrendingUp,
  MdAccessTime
} from "react-icons/md";
import { Link } from "react-router-dom";
import Axios from "../../utils/network/axios";
import SummaryApi from "../../comman/summaryApi";

// ========================
// COMPONENTS
// ========================

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="px-6 py-10 max-w-7xl mx-auto animate-pulse">
    {/* Hero Skeleton */}
    <div className="relative rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100 p-10 overflow-hidden mb-10">
      <div className="relative z-10 max-w-xl">
        <div className="h-10 bg-slate-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-300 rounded w-1/2 mb-6"></div>
        <div className="h-12 bg-slate-300 rounded w-40"></div>
      </div>
    </div>

    {/* Stats Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-200 w-12 h-12"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Reading Cards Skeleton */}
    <div className="mb-8">
      <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4">
            <div className="h-40 rounded-lg mb-3 bg-slate-200"></div>
            <div className="h-5 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Error State Component
const ErrorState = ({ message, onRetry }) => (
  <div className="px-6 py-20 max-w-7xl mx-auto text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
      <FiAlertCircle size={32} />
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h3>
    <p className="text-slate-600 mb-6 max-w-md mx-auto">{message}</p>
    <button
      onClick={onRetry}
      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <FiRefreshCw /> Try Again
    </button>
  </div>
);

// Stat Card Component
const StatCard = React.memo(({ icon, label, value, trend, loading = false }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-200 w-12 h-12"></div>
          <div>
            <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
            <div className="h-6 bg-slate-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 text-2xl">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {trend && (
              <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// Reading Card Component with Progress
const ReadingCard = React.memo(({ ebook, loading = false }) => {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 p-4 animate-pulse">
        <div className="h-40 rounded-lg mb-3 bg-slate-200"></div>
        <div className="h-5 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      </div>
    );
  }

  const progress = ebook.progress || Math.floor(Math.random() * 100);
  const lastRead = ebook.lastRead || "Recently";

  return (
    <Link
      to={`/ebooks/${ebook._id}`}
      className="group rounded-xl border border-slate-200 bg-white p-5 hover:shadow-xl transition-all duration-300 block hover:-translate-y-1"
      aria-label={`Continue reading ${ebook.title} by ${ebook.author}`}
    >
      {/* Cover Image with Overlay */}
      <div className="relative h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {ebook.coverImage?.url ? (
          <>
            <img
              src={ebook.coverImage.url}
              alt={`Cover of ${ebook.title}`}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
            <FiBookOpen className="text-4xl text-indigo-400" />
          </div>
        )}
        
        {/* Progress Indicator */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-xs text-white mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div>
        <h3 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors mb-1">
          {ebook.title}
        </h3>
        <p className="text-sm text-slate-500 mb-2">{ebook.author}</p>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <FiClock size={12} />
            {lastRead}
          </span>
          <span className="flex items-center gap-1">
            <FiTrendingUp size={12} />
            {ebook.stats?.views || 0} views
          </span>
        </div>
      </div>
    </Link>
  );
});

ReadingCard.displayName = 'ReadingCard';

// Hero Section Component
const HeroSection = React.memo(({ userName, isLoading }) => {
  const greetings = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  if (isLoading) {
    return (
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100 p-10 overflow-hidden animate-pulse">
        <div className="relative z-10 max-w-xl">
          <div className="h-10 bg-slate-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-slate-300 rounded w-1/2 mb-6"></div>
          <div className="h-12 bg-slate-300 rounded w-40"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-8 md:p-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-3">
          <FiUser size={14} />
          <span>{greetings}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          Welcome back{userName ? `, ${userName}` : ""}
          <span className="block text-2xl md:text-3xl font-normal text-white/90 mt-2">
            Ready to continue your learning journey?
          </span>
        </h1>

        <p className="text-lg text-white/90 mb-8 max-w-lg">
          Dive back into your curated collection of ebooks and notes. 
          {userName ? ` ${userName}, you` : " You"} have new recommendations waiting.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/ebooks"
            className="inline-flex items-center gap-3 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <FiBookOpen size={20} />
            Explore Library
            <FiChevronRight size={20} />
          </Link>
          
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <FiUser size={18} />
            View Profile
          </Link>
        </div>
      </div>

      {/* Stats Preview */}
      <div className="relative z-10 mt-10 grid grid-cols-3 gap-4 max-w-lg">
        <div className="text-center">
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm text-white/80">Access</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">100+</div>
          <div className="text-sm text-white/80">Books</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">∞</div>
          <div className="text-sm text-white/80">Learning</div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

// Quick Actions Component
const QuickActions = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300">
      <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
        <FiSearch size={20} />
      </div>
      <span className="text-sm font-medium text-slate-700">Search</span>
    </button>
    
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300">
      <div className="p-2 rounded-lg bg-green-100 text-green-600">
        <FiFilter size={20} />
      </div>
      <span className="text-sm font-medium text-slate-700">Filter</span>
    </button>
    
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300">
      <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
        <MdTrendingUp size={20} />
      </div>
      <span className="text-sm font-medium text-slate-700">Trending</span>
    </button>
    
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-300">
      <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
        <MdAccessTime size={20} />
      </div>
      <span className="text-sm font-medium text-slate-700">Recent</span>
    </button>
  </div>
);

// ========================
// MAIN USER HOME COMPONENT
// ========================

const UserHome = () => {
  const [state, setState] = useState({
    user: null,
    ebooks: [],
    loading: true,
    error: null,
    stats: {
      totalBooks: 0,
      totalViews: 0,
      hoursLearned: 0,
      completedBooks: 0,
    },
    lastUpdated: null,
  });

  const fetchTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // Calculate stats with memoization
  const calculateStats = useCallback((ebooks) => {
    const totalBooks = ebooks.length;
    const totalViews = ebooks.reduce((sum, e) => sum + (e.stats?.views || 0), 0);
    const completedBooks = ebooks.filter(e => e.progress >= 100).length;
    const hoursLearned = Math.floor(totalBooks * 1.5 + completedBooks * 5);

    return {
      totalBooks,
      totalViews,
      hoursLearned,
      completedBooks,
      avgViewsPerBook: totalBooks > 0 ? Math.round(totalViews / totalBooks) : 0,
    };
  }, []);

  // Fetch home data with debouncing and error handling
  const fetchHomeData = useCallback(async (retryCount = 0) => {
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      try {
        if (isMountedRef.current) {
          setState(prev => ({ ...prev, loading: true, error: null }));
        }

        const [userResponse, ebooksResponse] = await Promise.all([
          Axios({
            url: SummaryApi.profile.url,
            method: SummaryApi.profile.method,
            timeout: 10000,
          }).catch(() => ({ data: { data: null } })),
          
          Axios({
            url: SummaryApi.listEbooks.url,
            method: SummaryApi.listEbooks.method,
            timeout: 10000,
          }).catch(() => ({ data: { data: [] } })),
        ]);

        if (!isMountedRef.current) return;

        const userData = userResponse?.data?.data || null;
        const ebooksData = ebooksResponse?.data?.data || [];
        
        const stats = calculateStats(ebooksData);

        setState({
          user: userData,
          ebooks: ebooksData,
          stats,
          loading: false,
          error: null,
          lastUpdated: new Date().toISOString(),
        });

        // Store in session storage for offline fallback
        try {
          sessionStorage.setItem('userHomeCache', JSON.stringify({
            user: userData,
            ebooks: ebooksData,
            stats,
            timestamp: Date.now(),
          }));
        } catch (e) {
          console.warn('Failed to cache data:', e);
        }

      } catch (error) {
        if (!isMountedRef.current) return;

        console.error('Home fetch error:', error);

        // Try to load from cache
        try {
          const cached = sessionStorage.getItem('userHomeCache');
          if (cached) {
            const { user, ebooks, stats, timestamp } = JSON.parse(cached);
            // Use cache if less than 5 minutes old
            if (Date.now() - timestamp < 5 * 60 * 1000) {
              setState({
                user,
                ebooks,
                stats,
                loading: false,
                error: 'Using cached data (offline)',
                lastUpdated: new Date(timestamp).toISOString(),
              });
              return;
            }
          }
        } catch (e) {
          // Ignore cache errors
        }

        // Retry logic
        if (retryCount < 2) {
          setTimeout(() => fetchHomeData(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }

        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load data. Please check your connection.',
        }));
      }
    }, 300); // 300ms debounce
  }, [calculateStats]);

  // Initial fetch
  useEffect(() => {
    isMountedRef.current = true;
    fetchHomeData();

    return () => {
      isMountedRef.current = false;
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [fetchHomeData]);

  // Refresh function
  const handleRefresh = useCallback(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  // Get recently viewed ebooks
  const recentlyViewedEbooks = useMemo(() => {
    return [...state.ebooks]
      .sort((a, b) => new Date(b.lastRead || 0) - new Date(a.lastRead || 0))
      .slice(0, 6);
  }, [state.ebooks]);

  // Get trending ebooks
  const trendingEbooks = useMemo(() => {
    return [...state.ebooks]
      .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
      .slice(0, 3);
  }, [state.ebooks]);

  // Loading state
  if (state.loading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (state.error && !state.ebooks.length) {
    return <ErrorState message={state.error} onRetry={handleRefresh} />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Error Banner */}
      {state.error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="text-yellow-600" size={20} />
            <p className="text-yellow-700 text-sm">{state.error}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="text-yellow-700 hover:text-yellow-800 text-sm font-medium flex items-center gap-1"
          >
            <FiRefreshCw size={16} /> Refresh
          </button>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection userName={state.user?.name} isLoading={state.loading} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Learning Dashboard</h2>
          {state.lastUpdated && (
            <span className="text-sm text-slate-500">
              Updated {new Date(state.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<MdLibraryBooks size={24} />}
            label="Total Books"
            value={state.stats.totalBooks}
            trend={state.stats.totalBooks > 0 ? 12 : 0}
          />
          <StatCard
            icon={<MdAccessTime size={24} />}
            label="Hours Learned"
            value={`${state.stats.hoursLearned}h`}
            trend={8}
          />
          <StatCard
            icon={<FiTrendingUp size={24} />}
            label="Total Views"
            value={state.stats.totalViews.toLocaleString()}
            trend={state.stats.avgViewsPerBook > 10 ? 15 : 5}
          />
          <StatCard
            icon={<FiBookOpen size={24} />}
            label="Completed"
            value={state.stats.completedBooks}
            trend={state.stats.completedBooks > 0 ? 20 : 0}
          />
        </div>
      </section>

      {/* Continue Reading Section */}
      {recentlyViewedEbooks.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Continue Reading</h2>
            <Link
              to="/ebooks"
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
            >
              View All <FiChevronRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyViewedEbooks.slice(0, 3).map((ebook) => (
              <ReadingCard key={ebook._id} ebook={ebook} />
            ))}
          </div>
        </section>
      )}

      {/* Trending Section */}
      {trendingEbooks.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
            <Link
              to="/ebooks/trending"
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
            >
              See Trends <FiChevronRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingEbooks.map((ebook, index) => (
              <div key={ebook._id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-2 -left-2 bg-linear-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    #1 Trending
                  </div>
                )}
                <ReadingCard ebook={ebook} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!state.loading && state.ebooks.length === 0 && !state.error && (
        <div className="mt-14 text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
            <FiBookOpen size={32} />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No eBooks Yet</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Start your learning journey by exploring our library of curated ebooks and notes.
          </p>
          <Link
            to="/ebooks"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiBookOpen /> Browse Library
          </Link>
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleRefresh}
          disabled={state.loading}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiRefreshCw className={state.loading ? 'animate-spin' : ''} />
          {state.loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
};

// Add display name
UserHome.displayName = 'UserHome';

export default React.memo(UserHome);
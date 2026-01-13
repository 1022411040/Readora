import { useEffect, useState, useCallback, useMemo } from "react";
import Axios from "../utils/network/axios";
import SummaryApi from "../comman/summaryApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBookOpen,
  FiSearch,
  FiFilter,
  FiChevronRight,
  FiStar,
  FiBook,
  FiGrid,
  FiList,
  FiX,
  FiMenu,
  FiClock,
  FiUser,
  FiDownload,
  FiBookmark,
  FiEye,
  FiTrendingUp,
  FiCalendar
} from "react-icons/fi";
import { debounce } from "lodash";

const CategoryWisebook = () => {
  const [categories, setCategories] = useState([]);
  const [ebooks, setEbooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list' or 'compact'
  const [sortBy, setSortBy] = useState("newest");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCategories: 0,
    recentlyAdded: 0
  });

  // Handle scroll for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, ebookRes] = await Promise.all([
          Axios(SummaryApi.getCategories),
          Axios(SummaryApi.listEbooks)
        ]);

        const catData = catRes.data.data || [];
        const ebookData = ebookRes.data.data || [];

        setCategories(catData);
        setEbooks(ebookData);

        // Calculate stats
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentlyAdded = ebookData.filter(
          book => new Date(book.createdAt) > sevenDaysAgo
        ).length;

        setStats({
          totalBooks: ebookData.length,
          totalCategories: catData.length,
          recentlyAdded
        });

        if (catData.length > 0) {
          setSelectedCategory(catData[0]._id);
        }
      } catch (err) {
        console.error("Library fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  // Filter and sort books with useMemo for performance
  const filteredEbooks = useMemo(() => {
    if (!selectedCategory) return [];

    const filtered = ebooks.filter((book) => {
      const matchesCategory = book.category?._id === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title?.localeCompare(b.title);
        case "author":
          return a.author?.localeCompare(b.author);
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
  }, [ebooks, selectedCategory, searchQuery, sortBy]);

  const activeCategory = categories.find((c) => c._id === selectedCategory);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full mx-auto"
            />
            <FiBook className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-indigo-600" />
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-700 font-medium text-lg tracking-wide"
          >
            Loading your digital library...
          </motion.p>
          <p className="text-slate-500 text-sm mt-2">Fetching collections and books</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      {/* Sticky Header */}
      <header className={`sticky top-0 z-20 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FiMenu className="text-2xl text-slate-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Library
                </h1>
                <p className="text-sm text-slate-600">
                  {stats.totalBooks} books • {stats.totalCategories} categories
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search books, authors, or topics..."
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 w-96 bg-white/80 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="author">Author A-Z</option>
                  <option value="popular">Most Popular</option>
                </select>

                <div className="flex items-center bg-white border border-slate-300 rounded-lg p-1 gap-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "grid"
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <FiGrid className="text-lg" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "list"
                        ? "bg-indigo-100 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <FiList className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-6">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search library..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ================= SIDEBAR / CATEGORIES ================= */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
                <motion.aside
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold text-slate-900">Categories</h2>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 hover:bg-slate-100 rounded-lg"
                      >
                        <FiX className="text-xl" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {categories.map((cat) => {
                        const active = selectedCategory === cat._id;
                        const bookCount = ebooks.filter(
                          (book) => book.category?._id === cat._id
                        ).length;

                        return (
                          <button
                            key={cat._id}
                            onClick={() => {
                              setSelectedCategory(cat._id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                              active
                                ? "bg-linear-to-r from-indigo-50 to-indigo-100 border border-indigo-200"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <span className={`font-medium ${active ? "text-indigo-700" : "text-slate-700"}`}>
                              {cat.name}
                            </span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              active
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {bookCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Stats */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h3 className="font-semibold text-slate-900 mb-4">Library Stats</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <FiBook className="text-blue-600" />
                            <p className="text-sm text-blue-700 font-medium">Total Books</p>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">{stats.totalBooks}</p>
                        </div>
                        <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <FiTrendingUp className="text-emerald-600" />
                            <p className="text-sm text-emerald-700 font-medium">This Week</p>
                          </div>
                          <p className="text-2xl font-bold text-emerald-900">+{stats.recentlyAdded}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start h-[calc(100vh-120px)] overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FiBookOpen className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Categories</h2>
                  <p className="text-sm text-slate-600">Browse by topic</p>
                </div>
              </div>

              <nav className="space-y-1">
                {categories.map((cat) => {
                  const active = selectedCategory === cat._id;
                  const bookCount = ebooks.filter(
                    (book) => book.category?._id === cat._id
                  ).length;

                  return (
                    <motion.button
                      key={cat._id}
                      onClick={() => setSelectedCategory(cat._id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between text-left p-3 rounded-xl transition-all ${
                        active
                          ? "bg-linear-to-r from-indigo-50 to-indigo-100 border border-indigo-200 shadow-sm"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${active ? "bg-indigo-600" : "bg-slate-300"}`} />
                        <span className={`font-medium ${active ? "text-indigo-700" : "text-slate-700"}`}>
                          {cat.name}
                        </span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        active
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {bookCount}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Library Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiBook className="text-slate-600" />
                      <span className="text-sm text-slate-700">Total Books</span>
                    </div>
                    <span className="font-bold text-slate-900">{stats.totalBooks}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="text-slate-600" />
                      <span className="text-sm text-slate-700">This Week</span>
                    </div>
                    <span className="font-bold text-green-600">+{stats.recentlyAdded}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <FiEye className="text-slate-600" />
                      <span className="text-sm text-slate-700">Categories</span>
                    </div>
                    <span className="font-bold text-slate-900">{stats.totalCategories}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="flex-1 min-w-0">
            {/* Category Header */}
            <div className="mb-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center justify-between w-full bg-white border border-slate-200 rounded-2xl px-5 py-4">
                  <h1 className="text-3xl font-bold text-slate-900 ">
                    {activeCategory?.name}
                  </h1>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="flex items-center gap-2">
                      <FiBook className="text-sm" />
                      {filteredEbooks.length} books
                    </span>
                    <span className="flex items-center gap-2">
                      <FiClock className="text-sm" />
                      Updated daily
                    </span>
                  </div>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 lg:hidden">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="newest">Newest</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                  </select>
                  <div className="flex items-center bg-white border border-slate-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md ${viewMode === "grid" ? "bg-indigo-100 text-indigo-600" : "text-slate-600"}`}
                    >
                      <FiGrid />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md ${viewMode === "list" ? "bg-indigo-100 text-indigo-600" : "text-slate-600"}`}
                    >
                      <FiList />
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
                  <p className="text-slate-700">
                    Showing results for "<span className="font-semibold">{searchQuery}</span>" in {activeCategory?.name}
                    <span className="ml-2 text-sm bg-white px-2 py-1 rounded-full">
                      {filteredEbooks.length} books found
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Books Display */}
            {filteredEbooks.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-slate-100 to-slate-200 mb-6">
                  <FiSearch className="text-2xl text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  No books found
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {searchQuery
                    ? `We couldn't find any books matching "${searchQuery}" in ${activeCategory?.name}. Try a different search term.`
                    : `No books are currently available in the ${activeCategory?.name} category. Check back soon!`}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              // Grid View
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEbooks.map((book, index) => (
                  <motion.div
                    key={book._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                      {/* Book Cover */}
                      <div className="relative h-45 overflow-hidden">
                        {book.coverImage?.url ? (
                          <motion.img
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.4 }}
                            src={book.coverImage.url}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
                            <FiBook className="text-5xl text-indigo-300" />
                          </div>
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Quick Actions */}
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
                            <FiBookmark className="text-slate-800" />
                          </button>
                        </div>
                      </div>

                      {/* Book Info */}
                      <div className="p-5 border-t">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900 line-clamp-1 mb-1">
                              {book.title}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-1 flex items-center gap-2">
                              <FiUser className="text-slate-400" />
                              {book.author || "Unknown Author"}
                            </p>
                          </div>
                          <span className="text-xs font-medium bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded-full whitespace-nowrap">
                            {book.pages || "N/A"} pages
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`text-sm ${i < (book.rating || 4) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                              />
                            ))}
                            <span className="text-xs text-slate-500 ml-2">{book.rating || 4.0}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500">
                              {book.downloads || 0} downloads
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                          <button className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2">
                            <FiBookOpen />
                            Read Now
                          </button>
                          <button className="p-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                            <FiDownload />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-3">
                {filteredEbooks.map((book) => (
                  <motion.div
                    key={book._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Book Cover */}
                      <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0 border">
                        {book.coverImage?.url ? (
                          <img
                            src={book.coverImage.url}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
                            <FiBook className="text-2xl text-indigo-300" />
                          </div>
                        )}
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">
                              {book.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <FiUser className="text-slate-400" />
                                {book.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiBook className="text-slate-400" />
                                {book.pages || "N/A"} pages
                              </span>
                              <span className="flex items-center gap-1">
                                <FiEye className="text-slate-400" />
                                {book.views || 0} views
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`text-sm ${i < (book.rating || 4) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                          {book.description || "No description available for this book."}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium bg-linear-to-r from-slate-100 to-slate-200 text-slate-700 px-3 py-1.5 rounded-full">
                            Published: {new Date(book.createdAt).getFullYear()}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-md transition-all text-sm flex items-center gap-2">
                              <FiBookOpen />
                              Read
                            </button>
                            <button className="p-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                              <FiDownload />
                            </button>
                            <button className="p-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                              <FiBookmark />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            {filteredEbooks.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600">
                    Showing <span className="font-semibold">{filteredEbooks.length}</span> of {ebooks.length} total books
                  </p>
                  <button className="px-6 py-3 bg-linear-to-r from-slate-100 to-slate-200 text-slate-700 rounded-lg font-medium hover:from-slate-200 hover:to-slate-300 transition-all">
                    Load More Books
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed bottom-6 left-6 lg:hidden z-40 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all"
      >
        <FiFilter className="text-xl" />
      </button>

      {/* Loading Overlay for API calls */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4"
              />
              <p className="text-slate-700 font-medium">Loading library...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryWisebook;
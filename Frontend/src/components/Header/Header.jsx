// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   FiMenu,
//   FiX,
//   FiSearch,
//   FiBell,
//   FiBookOpen,
//   FiHome,
//   FiTrendingUp,
//   FiBookmark,
//   FiUser,
//   FiSettings,
//   FiLogOut,
//   FiChevronDown,
//   FiMoon,
//   FiSun,
//   FiMessageCircle,
//   FiHelpCircle
// } from "react-icons/fi";
// import { 
//   MdLibraryBooks,
//   MdCategory,
//   MdDashboard
// } from "react-icons/md";
// import { motion, AnimatePresence } from "framer-motion";

// // ========================
// // SUB-COMPONENTS
// // ========================

// // Search Component
// const HeaderSearch = () => {
//   const [query, setQuery] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef(null);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query.trim())}`);
//       setIsFocused(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Escape') {
//       setIsFocused(false);
//       inputRef.current?.blur();
//     }
//   };

//   useEffect(() => {
//     if (isFocused) {
//       inputRef.current?.focus();
//     }
//   }, [isFocused]);

//   return (
//     <div className="relative flex-1 max-w-xl">
//       <form onSubmit={handleSubmit} className="relative">
//         <div className={`relative rounded-full transition-all duration-300 ${
//           isFocused ? 'ring-2 ring-indigo-500 ring-offset-2 bg-white shadow-lg' : 'bg-slate-100'
//         }`}>
//           <input
//             ref={inputRef}
//             type="search"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//             onKeyDown={handleKeyDown}
//             placeholder="Search books, authors, topics..."
//             className="w-full pl-12 pr-4 py-3 bg-transparent border-0 outline-none text-slate-700 placeholder-slate-500 text-sm rounded-full"
//           />
//           <button
//             type="submit"
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
//           >
//             <FiSearch size={18} />
//           </button>
//           {query && (
//             <button
//               type="button"
//               onClick={() => setQuery("")}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
//             >
//               <FiX size={16} />
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Search Suggestions Dropdown */}
//       <AnimatePresence>
//         {isFocused && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
//           >
//             <div className="p-4">
//               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
//                 Recent Searches
//               </p>
//               <div className="space-y-2">
//                 {["JavaScript", "React", "Python", "Machine Learning"].map((term) => (
//                   <button
//                     key={term}
//                     onClick={() => {
//                       setQuery(term);
//                       navigate(`/search?q=${encodeURIComponent(term)}`);
//                     }}
//                     className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-700 flex items-center justify-between group"
//                   >
//                     <span className="flex items-center gap-2">
//                       <FiSearch size={14} className="text-slate-400" />
//                       {term}
//                     </span>
//                     <FiChevronDown className="transform -rotate-90 text-slate-400 group-hover:text-slate-600" size={14} />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // Notification Bell with Dropdown
// const NotificationBell = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notifications, setNotifications] = useState([
//     { id: 1, text: "New ebook added to your library", time: "2 mins ago", read: false },
//     { id: 2, text: "Your reading streak is 7 days!", time: "1 hour ago", read: true },
//     { id: 3, text: "Recommended: Advanced React Patterns", time: "3 hours ago", read: true },
//   ]);

//   const unreadCount = notifications.filter(n => !n.read).length;

//   const markAsRead = (id) => {
//     setNotifications(notifs => 
//       notifs.map(n => n.id === id ? { ...n, read: true } : n)
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
//         aria-label="Notifications"
//       >
//         <FiBell size={20} className="text-slate-700" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <div 
//               className="fixed inset-0 z-40" 
//               onClick={() => setIsOpen(false)}
//             />
//             <motion.div
//               initial={{ opacity: 0, y: 10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 10, scale: 0.95 }}
//               className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
//             >
//               <div className="p-4 border-b border-slate-100">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="font-semibold text-slate-900">Notifications</h3>
//                   {unreadCount > 0 && (
//                     <button
//                       onClick={markAllAsRead}
//                       className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
//                     >
//                       Mark all as read
//                     </button>
//                   )}
//                 </div>
//                 <p className="text-xs text-slate-500">
//                   {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
//                 </p>
//               </div>

//               <div className="max-h-96 overflow-y-auto">
//                 {notifications.length > 0 ? (
//                   notifications.map((notification) => (
//                     <div
//                       key={notification.id}
//                       className={`p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
//                         !notification.read ? 'bg-blue-50' : ''
//                       }`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <div className={`mt-0.5 w-2 h-2 rounded-full ${
//                           !notification.read ? 'bg-blue-500' : 'bg-slate-300'
//                         }`} />
//                         <div className="flex-1">
//                           <p className="text-sm text-slate-800">{notification.text}</p>
//                           <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
//                         </div>
//                         {!notification.read && (
//                           <button
//                             onClick={() => markAsRead(notification.id)}
//                             className="text-xs text-blue-600 hover:text-blue-700 font-medium"
//                           >
//                             Mark read
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="p-8 text-center">
//                     <FiBell className="mx-auto text-slate-300 mb-3" size={32} />
//                     <p className="text-slate-500 text-sm">No notifications yet</p>
//                   </div>
//                 )}
//               </div>

//               <div className="p-4 border-t border-slate-100">
//                 <Link
//                   to="/notifications"
//                   className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
//                 >
//                   View all notifications
//                 </Link>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // User Menu with Smooth Dropdown
// const UserMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const menuRef = useRef(null);

//   const menuItems = [
//     { icon: <FiUser />, label: "Profile", to: "/profile" },
//     { icon: <FiBookmark />, label: "Bookmarks", to: "/bookmarks" },
//     { icon: <FiSettings />, label: "Settings", to: "/settings" },
//     { icon: <FiHelpCircle />, label: "Help & Support", to: "/help" },
//     { icon: <FiLogOut />, label: "Logout", action: () => console.log("Logout") },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors group"
//       >
//         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
//           {user?.name?.charAt(0).toUpperCase() || "U"}
//         </div>
//         <div className="hidden md:block text-left">
//           <p className="text-sm font-medium text-slate-900 line-clamp-1">
//             {user?.name || "User"}
//           </p>
//           <p className="text-xs text-slate-500">Premium Member</p>
//         </div>
//         <FiChevronDown className={`text-slate-500 transition-transform duration-200 ${
//           isOpen ? 'rotate-180' : ''
//         }`} size={16} />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//             className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
//           >
//             {/* User Info */}
//             <div className="p-4 border-b border-slate-100">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
//                   {user?.name?.charAt(0).toUpperCase() || "U"}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-slate-900">{user?.name || "User"}</p>
//                   <p className="text-sm text-slate-500">{user?.email || "user@example.com"}</p>
//                 </div>
//               </div>
//               <div className="mt-3 pt-3 border-t border-slate-100">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-600">Reading Streak</span>
//                   <span className="font-semibold text-indigo-600">7 days 🔥</span>
//                 </div>
//               </div>
//             </div>

//             {/* Menu Items */}
//             <div className="py-2">
//               {menuItems.map((item, index) => (
//                 <React.Fragment key={item.label}>
//                   {item.to ? (
//                     <Link
//                       to={item.to}
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                     >
//                       <span className="text-slate-600">{item.icon}</span>
//                       {item.label}
//                     </Link>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         item.action?.();
//                         setIsOpen(false);
//                       }}
//                       className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
//                     >
//                       <span className="text-slate-600">{item.icon}</span>
//                       {item.label}
//                     </button>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>

//             {/* Dark Mode Toggle */}
//             <div className="p-4 border-t border-slate-100">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-slate-700">Dark Mode</span>
//                 <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
//                   <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition" />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// // User Menu Skeleton
// const UserMenuSkeleton = () => (
//   <div className="flex items-center gap-2 px-3 py-2">
//     <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
//     <div className="hidden md:block space-y-1">
//       <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
//       <div className="h-2 w-16 bg-slate-200 rounded animate-pulse" />
//     </div>
//     <div className="w-4 h-4 bg-slate-200 rounded animate-pulse" />
//   </div>
// );

// // Mobile Menu with Smooth Animation
// const MobileMenu = ({ open, setOpen }) => {
//   const location = useLocation();
//   const { isAuthenticated } = useSelector((state) => state.user);

//   const menuItems = [
//     { icon: <FiHome />, label: "Home", to: "/" },
//     { icon: <MdLibraryBooks />, label: "Library", to: "/ebooks" },
//     { icon: <MdCategory />, label: "Categories", to: "/categories" },
//     { icon: <FiTrendingUp />, label: "Trending", to: "/trending" },
//     { icon: <FiBookmark />, label: "Bookmarks", to: "/bookmarks" },
//     { icon: <MdDashboard />, label: "Dashboard", to: "/dashboard" },
//   ];

//   const authItems = isAuthenticated
//     ? [
//         { icon: <FiUser />, label: "Profile", to: "/profile" },
//         { icon: <FiSettings />, label: "Settings", to: "/settings" },
//         { icon: <FiLogOut />, label: "Logout", to: "/logout" },
//       ]
//     : [
//         { icon: <FiUser />, label: "Login", to: "/login" },
//         { icon: <FiMessageCircle />, label: "Sign Up", to: "/register" },
//       ];

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setOpen(false)}
//           />

//           {/* Menu Panel */}
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 lg:hidden flex flex-col"
//           >
//             {/* Header */}
//             <div className="p-6 border-b border-slate-200 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
//                   <FiBookOpen className="text-white" size={18} />
//                 </div>
//                 <span className="text-xl font-bold text-slate-900">
//                   Read<span className="text-indigo-600">ora</span>
//                 </span>
//               </div>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="p-2 rounded-full hover:bg-slate-100 transition-colors"
//               >
//                 <FiX size={24} className="text-slate-700" />
//               </button>
//             </div>

//             {/* User Info */}
//             {isAuthenticated && (
//               <div className="p-6 border-b border-slate-200">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
//                     U
//                   </div>
//                   <div>
//                     <p className="font-semibold text-slate-900">John Doe</p>
//                     <p className="text-sm text-slate-500">Premium Member</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Search in Mobile Menu */}
//             <div className="p-6 border-b border-slate-200">
//               <div className="relative">
//                 <input
//                   type="search"
//                   placeholder="Search..."
//                   className="w-full pl-10 pr-4 py-3 bg-slate-100 border-0 rounded-full text-sm outline-none"
//                 />
//                 <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//               </div>
//             </div>

//             {/* Main Menu */}
//             <div className="flex-1 overflow-y-auto py-4">
//               <div className="px-4 mb-6">
//                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
//                   Navigation
//                 </p>
//                 <nav className="space-y-1">
//                   {menuItems.map((item) => (
//                     <Link
//                       key={item.label}
//                       to={item.to}
//                       onClick={() => setOpen(false)}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors ${
//                         location.pathname === item.to ? 'bg-indigo-50 text-indigo-600' : ''
//                       }`}
//                     >
//                       <span className={`text-lg ${
//                         location.pathname === item.to ? 'text-indigo-600' : 'text-slate-500'
//                       }`}>
//                         {item.icon}
//                       </span>
//                       {item.label}
//                     </Link>
//                   ))}
//                 </nav>
//               </div>

//               <div className="px-4">
//                 <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
//                   Account
//                 </p>
//                 <nav className="space-y-1">
//                   {authItems.map((item) => (
//                     <Link
//                       key={item.label}
//                       to={item.to}
//                       onClick={() => setOpen(false)}
//                       className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
//                     >
//                       <span className="text-lg text-slate-500">{item.icon}</span>
//                       {item.label}
//                     </Link>
//                   ))}
//                 </nav>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="p-6 border-t border-slate-200">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm text-slate-600">Dark Mode</span>
//                 <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
//                   <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition" />
//                 </button>
//               </div>
//               <p className="text-xs text-slate-500 text-center">
//                 © {new Date().getFullYear()} Readora. All rights reserved.
//               </p>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Main Navigation Icons
// const HeaderNav = () => {
//   const navItems = [
//     { icon: <FiHome />, label: "Home", to: "/" },
//     { icon: <MdLibraryBooks />, label: "Library", to: "/ebooks" },
//     { icon: <MdCategory />, label: "Categories", to: "/categories" },
//     { icon: <FiBookmark />, label: "Bookmarks", to: "/bookmarks" },
//   ];

//   return (
//     <div className="hidden md:flex items-center gap-1">
//       {navItems.map((item) => (
//         <Link
//           key={item.label}
//           to={item.to}
//           className="p-2 rounded-full hover:bg-slate-100 transition-colors relative group"
//           aria-label={item.label}
//         >
//           <span className="text-slate-700 text-xl">{item.icon}</span>
//           {/* Tooltip */}
//           <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//             {item.label}
//             <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 transform rotate-45" />
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// // ========================
// // MAIN HEADER COMPONENT
// // ========================

// function Header() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { isAuthenticated } = useSelector((state) => state.user);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <header className={`sticky top-0 z-50 transition-all duration-300 ${
//         scrolled 
//           ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50' 
//           : 'bg-white/90 backdrop-blur-lg border-b border-slate-200/30'
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="h-16 flex items-center justify-between gap-4">
            
//             {/* Brand */}
//             <Link 
//               to="/" 
//               className="flex items-center gap-2 shrink-0 group"
//               onClick={() => setOpen(false)}
//             >
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"
//               >
//                 <FiBookOpen className="text-white" size={18} />
//               </motion.div>
//               <div className="flex flex-col">
//                 <span className="text-xl font-bold tracking-tight text-slate-900">
//                   Read<span className="text-indigo-600">ora</span>
//                 </span>
//                 <span className="text-[10px] text-slate-500 -mt-1">Learn without limits</span>
//               </div>
//             </Link>

//             {/* Desktop Search */}
//             <div className="hidden lg:flex flex-1 justify-center max-w-2xl">
//               <HeaderSearch />
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center gap-2">
//               {/* Mobile Search Button */}
//               <button 
//                 className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
//                 onClick={() => {/* Implement mobile search modal */}}
//                 aria-label="Search"
//               >
//                 <FiSearch size={20} className="text-slate-700" />
//               </button>

//               {/* Notification Bell */}
//               {isAuthenticated && <NotificationBell />}

//               {/* Desktop Navigation */}
//               <div className="hidden md:block">
//                 <HeaderNav />
//               </div>

//               {/* User Menu */}
//               {isAuthenticated ? (
//                 <UserMenu />
//               ) : (
//                 <div className="hidden md:flex items-center gap-2">
//                   <Link
//                     to="/login"
//                     className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
//                   >
//                     Sign in
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all"
//                   >
//                     Get Started
//                   </Link>
//                 </div>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors relative"
//                 aria-label="Menu"
//               >
//                 <div className="relative w-6 h-6">
//                   <motion.div
//                     animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
//                     className="absolute top-0 left-0 w-full h-0.5 bg-slate-700 rounded-full"
//                   />
//                   <motion.div
//                     animate={open ? { opacity: 0 } : { opacity: 1 }}
//                     className="absolute top-2 left-0 w-full h-0.5 bg-slate-700 rounded-full"
//                   />
//                   <motion.div
//                     animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
//                     className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-700 rounded-full"
//                   />
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search Bar (Shown on scroll) */}
//           <AnimatePresence>
//             {scrolled && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="lg:hidden overflow-hidden"
//               >
//                 <div className="py-3">
//                   <HeaderSearch />
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       <MobileMenu open={open} setOpen={setOpen} />
//     </>
//   );
// }

// export default React.memo(Header);

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiSearch,
  FiBell,
  FiBookOpen,
  FiHome,
  FiTrendingUp,
  FiBookmark,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiHelpCircle,
  FiGrid,
  FiMenu,
  FiX,
  FiClock,
  FiStar
} from "react-icons/fi";
import { 
  MdLibraryBooks,
  MdCategory,
  MdDashboard,
  MdLocalLibrary
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Axios from "../../utils/network/axios";
import SummaryApi from "../../comman/summaryApi";
import { logoutUser as logoutAction } from "../../Store/userSlice";

// ========================
// CUSTOM HOOKS
// ========================

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// ========================
// SUB-COMPONENTS
// ========================

// Search Component with Real Search API
const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  
  const debouncedQuery = useDebounce(query, 300);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse search history:', e);
      }
    }
  }, []);

  // Fetch search suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        // You can implement real search suggestions here
        // For now, we'll use a mock based on search history
        const filtered = searchHistory.filter(item =>
          item.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } catch (error) {
        console.error('Search suggestions error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, searchHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Save to search history
    const updatedHistory = [
      query.trim(),
      ...searchHistory.filter(item => item !== query.trim())
    ].slice(0, 10);
    
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setIsFocused(false);
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setIsFocused(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative rounded-full transition-all duration-200 ${
          isFocused 
            ? 'ring-2 ring-indigo-500/30 bg-white shadow-lg' 
            : 'bg-slate-100/80 hover:bg-slate-200/80'
        }`}>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            onKeyDown={handleKeyDown}
            placeholder="Search books, authors, or topics..."
            className="w-full pl-12 pr-10 py-2.5 bg-transparent outline-none text-slate-700 placeholder-slate-500 text-sm md:text-base rounded-full border border-slate-200"
            aria-label="Search"
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
            aria-label="Search"
          >
            <FiSearch size={18} />
          </button>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && (query || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
          >
            {query ? (
              <div className="py-2">
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Suggestions
                    </p>
                    {isSearching && (
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                  {suggestions.length > 0 ? (
                    suggestions.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSuggestionClick(term)}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-700 flex items-center gap-2 group"
                      >
                        <FiSearch size={14} className="text-slate-400 flex-shrink-0" />
                        <span className="truncate">{term}</span>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 px-4 py-2">
                      No suggestions found
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-2">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Recent Searches
                    </p>
                    {searchHistory.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="text-xs text-slate-500 hover:text-red-600 transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {searchHistory.length > 0 ? (
                    searchHistory.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(term)}
                        className="w-full text-left px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 text-sm text-slate-700 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <FiClock size={14} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{term}</span>
                        </div>
                        <FiChevronDown className="transform -rotate-90 text-slate-400 group-hover:text-slate-600" size={14} />
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <FiSearch className="mx-auto text-slate-300 mb-2" size={20} />
                      <p className="text-sm text-slate-500">No recent searches</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Notification Bell with Real Data
const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.read).length, 
    [notifications]
  );

  // Fetch notifications (you can implement real API call)
  useEffect(() => {
    if (isOpen && notifications.length === 0) {
      // Mock data - replace with real API call
      const mockNotifications = [
        { id: 1, text: "New ebook 'React Advanced Patterns' added", time: "2 mins ago", read: false, type: "new_ebook" },
        { id: 2, text: "Your reading streak is 7 days! Keep it up!", time: "1 hour ago", read: true, type: "streak" },
        { id: 3, text: "Recommended: 'JavaScript Design Patterns'", time: "3 hours ago", read: true, type: "recommendation" },
      ];
      setNotifications(mockNotifications);
    }
  }, [isOpen, notifications.length]);

  const markAsRead = (id) => {
    setNotifications(notifs => 
      notifs.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
        aria-label="Notifications"
      >
        <FiBell size={20} className="text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                        !notification.read ? 'bg-blue-500' : 'bg-slate-300'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-800 leading-relaxed">
                          {notification.text}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex-shrink-0 ml-2"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FiBell className="mx-auto text-slate-300 mb-3" size={32} />
                  <p className="text-slate-500 text-sm">No notifications yet</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100">
              <Link
                to="/notifications"
                className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// User Menu with Real Logout
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const handleLogout = async () => {
    try {
      await Axios({
        url: SummaryApi.logout.url,
        method: SummaryApi.logout.method
      });
      dispatch(logoutAction());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { icon: <FiUser />, label: "Profile", to: "/profile" },
    { icon: <FiBookmark />, label: "Bookmarks", to: "/bookmarks" },
    { icon: <FiSettings />, label: "Settings", to: "/settings" },
    { icon: <FiHelpCircle />, label: "Help & Support", to: "/help" },
  ];

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-full hover:bg-slate-100 transition-colors group outline-none focus:ring-2 focus:ring-indigo-500/30"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
          {getInitial()}
        </div>
        <div className="hidden md:block text-left min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {user?.role === 'admin' ? 'Admin' : 'Member'}
          </p>
        </div>
        <FiChevronDown className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${
          isOpen ? 'rotate-180' : ''
        }`} size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {getInitial()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{user?.name || "User"}</p>
                  <p className="text-sm text-slate-500 truncate">{user?.email || "user@example.com"}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Role</span>
                  <span className={`font-semibold ${
                    user?.role === 'admin' ? 'text-purple-600' : 'text-indigo-600'
                  }`}>
                    {user?.role === 'admin' ? 'Administrator' : 'Member'}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-slate-600">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="p-3 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// User Menu Skeleton
const UserMenuSkeleton = () => (
  <div className="flex items-center gap-2 px-3 py-2">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse" />
    <div className="hidden md:block space-y-1">
      <div className="h-3 w-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
      <div className="h-2 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
    </div>
    <div className="w-4 h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
  </div>
);

// Mobile Menu Component
const MobileMenu = ({ open, setOpen }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setOpen(false));

  const mainMenuItems = [
    { icon: <FiHome />, label: "Home", to: "/" },
    { icon: <MdLibraryBooks />, label: "Library", to: "/ebooks" },
    { icon: <MdCategory />, label: "Categories", to: "/categories" },
    { icon: <FiTrendingUp />, label: "Trending", to: "/trending" },
    { icon: <FiBookmark />, label: "Bookmarks", to: "/bookmarks" },
    { icon: <MdLocalLibrary />, label: "My Reads", to: "/my-reads" },
  ];

  const handleLogout = async () => {
    try {
      await Axios({
        url: SummaryApi.logout.url,
        method: SummaryApi.logout.method
      });
      dispatch(logoutAction());
      navigate('/login');
      setOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            ref={menuRef}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <FiBookOpen className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">
                    Read<span className="text-indigo-600">ora</span>
                  </p>
                  <p className="text-xs text-slate-500">Digital Library</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <FiX size={22} className="text-slate-700" />
              </button>
            </div>

            {/* User Info (if authenticated) */}
            {isAuthenticated && user && (
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-sm text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Reading</p>
                    <p className="font-bold text-indigo-600">12</p>
                  </div>
                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Completed</p>
                    <p className="font-bold text-green-600">5</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Search */}
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-0 rounded-lg text-sm outline-none"
                  onFocus={() => {
                    setOpen(false);
                    navigate('/search');
                  }}
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              </div>
            </div>

            {/* Main Menu */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-2">
                <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Navigation
                </p>
                <nav className="space-y-1">
                  {mainMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg mx-2 transition-colors ${
                        location.pathname === item.to 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`text-lg ${
                        location.pathname === item.to ? 'text-indigo-600' : 'text-slate-500'
                      }`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Account Section */}
              <div className="px-2 mt-6">
                <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Account
                </p>
                <nav className="space-y-1">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg mx-2 text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <FiUser className="text-slate-500 text-lg" />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg mx-2 text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <FiSettings className="text-slate-500 text-lg" />
                        <span className="font-medium">Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg mx-2 text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <FiLogOut className="text-lg" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-3 px-3 py-3 rounded-lg mx-2 text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <FiUser className="text-slate-500 text-lg" />
                        <span className="font-medium">Login</span>
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-3 px-3 py-3 rounded-lg mx-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                      >
                        <FiUser className="text-white text-lg" />
                        <span className="font-medium">Sign Up</span>
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex justify-center space-x-6 mb-3">
                <a href="/about" className="text-xs text-slate-500 hover:text-slate-700">About</a>
                <a href="/help" className="text-xs text-slate-500 hover:text-slate-700">Help</a>
                <a href="/terms" className="text-xs text-slate-500 hover:text-slate-700">Terms</a>
              </div>
              <p className="text-xs text-slate-500 text-center">
                © {new Date().getFullYear()} Readora
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Navigation Icons (Desktop)
const HeaderNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: <FiHome />, label: "Home", to: "/" },
    { icon: <MdLibraryBooks />, label: "Library", to: "/ebooks" },
    { icon: <MdCategory />, label: "Categories", to: "/categories" },
    { icon: <FiBookmark />, label: "Bookmarks", to: "/bookmarks" },
  ];

  return (
    <div className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className={`relative px-3 py-2 rounded-lg transition-all duration-200 ${
            location.pathname === item.to
              ? 'text-indigo-600 bg-indigo-50'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label={item.label}
        >
          <span className="text-lg">{item.icon}</span>
          
          {location.pathname === item.to && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </Link>
      ))}
    </div>
  );
};

// ========================
// MAIN HEADER COMPONENT
// ========================

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, loading: userLoading } = useSelector((state) => state.user);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50' 
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-14 md:h-16 flex items-center justify-between gap-4">
            
            {/* Brand & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Menu"
                aria-expanded={open}
              >
                <div className="relative w-5 h-5">
                  <motion.span
                    animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="absolute top-0 left-0 w-full h-0.5 bg-slate-700 rounded-full"
                  />
                  <motion.span
                    animate={open ? { opacity: 0 } : { opacity: 1 }}
                    className="absolute top-2 left-0 w-full h-0.5 bg-slate-700 rounded-full"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-700 rounded-full"
                  />
                </div>
              </button>

              <Link 
                to="/" 
                className="flex items-center gap-2 shrink-0 group"
                onClick={() => setOpen(false)}
              >
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <FiBookOpen className="text-white" size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                    Read<span className="text-indigo-600">ora</span>
                  </span>
                  <span className="text-[10px] md:text-xs text-slate-500 -mt-0.5 hidden sm:block">
                    Digital Library
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 justify-center max-w-2xl mx-8">
              <HeaderSearch />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Mobile Search Button */}
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                onClick={() => {/* You can implement mobile search modal */}}
                aria-label="Search"
              >
                <FiSearch size={20} className="text-slate-700" />
              </button>

              {/* Notification Bell (Authenticated only) */}
              {isAuthenticated && <NotificationBell />}

              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                <HeaderNav />
              </div>

              {/* User Menu / Auth Buttons */}
              {userLoading ? (
                <UserMenuSkeleton />
              ) : isAuthenticated ? (
                <UserMenu />
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-md transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar (Shown on scroll) */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden border-t border-slate-200/50"
              >
                <div className="py-2">
                  <HeaderSearch />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu open={open} setOpen={setOpen} />
    </>
  );
}

export default React.memo(Header);
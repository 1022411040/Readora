import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiBookOpen,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiArrowUp,
  FiHeart,
  FiCoffee,
  FiZap,
  FiUsers,
  FiGlobe,
  FiCheckCircle,
  FiChevronUp,
  FiRss,
  FiDownload
} from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

// Newsletter Subscription Component
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setMessage("Thank you for subscribing! Check your email.");
      setEmail("");
      
      // Reset message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <FiMail className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
        <div>
          <h3 className="font-semibold text-slate-900">Stay Updated</h3>
          <p className="text-sm text-slate-600 mt-1">
            Get weekly learning tips and book recommendations
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-sm"
            disabled={status === "loading"}
          />
          {status === "success" && (
            <FiCheckCircle className="absolute right-3 top-3.5 text-green-500" size={18} />
          )}
        </div>
        
        {message && (
          <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}
        
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <FiMail size={16} />
              Subscribe Now
            </>
          )}
        </button>
      </form>
      
      <p className="text-xs text-slate-500 mt-3 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
};

// Scroll to Top Button
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <FiChevronUp size={20} />
    </button>
  );
};

// Trust Badges Component
const TrustBadges = () => (
  <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-y border-slate-200">
    <div className="flex items-center gap-2">
      <MdOutlineSecurity className="text-green-600" size={18} />
      <span className="text-sm text-slate-700">Secure Platform</span>
    </div>
    <div className="flex items-center gap-2">
      <FiCheckCircle className="text-blue-600" size={18} />
      <span className="text-sm text-slate-700">Verified Content</span>
    </div>
    <div className="flex items-center gap-2">
      <TbDeviceDesktopAnalytics className="text-purple-600" size={18} />
      <span className="text-sm text-slate-700">Analytics</span>
    </div>
    <div className="flex items-center gap-2">
      <FiUsers className="text-orange-600" size={18} />
      <span className="text-sm text-slate-700">10K+ Readers</span>
    </div>
  </div>
);

// Language Selector Component
const LanguageSelector = () => {
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
  ];

  const [selectedLang, setSelectedLang] = useState("en");

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 text-slate-600 hover:text-slate-900 cursor-pointer group">
        <FiGlobe size={16} />
        <span className="text-sm font-medium">{languages.find(l => l.code === selectedLang)?.name}</span>
        <FiChevronUp className="transform rotate-180 group-hover:rotate-0 transition-transform" size={14} />
      </div>
      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block hover:block">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-2 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-50 transition ${
                selectedLang === lang.code ? "text-indigo-600 font-medium" : "text-slate-700"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Footer Component
const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Library", to: "/ebooks", icon: <FiBookOpen size={14} /> },
      { label: "Categories", to: "/categories", icon: <FiBookOpen size={14} /> },
      { label: "Dashboard", to: "/dashboard", icon: <TbDeviceDesktopAnalytics size={14} /> },
      { label: "Recommendations", to: "/recommendations", icon: <FiZap size={14} /> },
      { label: "Downloads", to: "/downloads", icon: <FiDownload size={14} /> },
    ],
    resources: [
      { label: "Help Center", to: "/help", icon: <FiMessageSquare size={14} /> },
      { label: "Documentation", to: "/docs", icon: <FiBookOpen size={14} /> },
      { label: "API Reference", to: "/api", icon: <FiGithub size={14} /> },
      { label: "Blog", to: "/blog", icon: <FiRss size={14} /> },
      { label: "Community", to: "/community", icon: <FiUsers size={14} /> },
    ],
    company: [
      { label: "About Us", to: "/about", icon: <FiUsers size={14} /> },
      { label: "Careers", to: "/careers", icon: <FiUsers size={14} /> },
      { label: "Contact", to: "/contact", icon: <FiMail size={14} /> },
      { label: "Partners", to: "/partners", icon: <FiUsers size={14} /> },
      { label: "Press", to: "/press", icon: <FiMessageSquare size={14} /> },
    ],
    legal: [
      { label: "Privacy Policy", to: "/privacy", icon: <MdOutlineSecurity size={14} /> },
      { label: "Terms of Service", to: "/terms", icon: <FiBookOpen size={14} /> },
      { label: "Cookie Policy", to: "/cookies", icon: <FiBookOpen size={14} /> },
      { label: "GDPR Compliance", to: "/gdpr", icon: <MdOutlineSecurity size={14} /> },
      { label: "Accessibility", to: "/accessibility", icon: <FiCheckCircle size={14} /> },
    ],
  };

  const socialLinks = [
    { icon: <FiGithub />, label: "GitHub", href: "https://github.com", color: "hover:text-gray-900" },
    { icon: <FiTwitter />, label: "Twitter", href: "https://twitter.com", color: "hover:text-blue-500" },
    { icon: <FiLinkedin />, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-700" },
    { icon: <FiYoutube />, label: "YouTube", href: "https://youtube.com", color: "hover:text-red-600" },
    { icon: <FiInstagram />, label: "Instagram", href: "https://instagram.com", color: "hover:text-pink-600" },
  ];

  const appStores = [
    { label: "App Store", href: "#", bg: "bg-black", text: "text-white" },
    { label: "Google Play", href: "#", bg: "bg-slate-900", text: "text-white" },
    { label: "Web App", href: "#", bg: "bg-gradient-to-r from-indigo-600 to-purple-600", text: "text-white" },
  ];

  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Trust Badges Section */}
      {isHomePage && <TrustBadges />}
      
      {/* Main Footer */}
      <footer className="bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Top Section - Main Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                  <FiBookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    YourLibrary
                  </h2>
                  <p className="text-sm text-slate-500">Learn. Grow. Succeed.</p>
                </div>
              </div>
              
              <p className="text-slate-600 mb-6 max-w-md">
                A modern learning platform with curated ebooks, notes, and study materials 
                designed to help you achieve your educational and professional goals.
              </p>
              
              {/* App Store Buttons */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-slate-700">Download our app</p>
                <div className="flex flex-wrap gap-2">
                  {appStores.map((store) => (
                    <a
                      key={store.label}
                      href={store.href}
                      className={`${store.bg} ${store.text} px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2`}
                    >
                      <FiDownload size={14} />
                      {store.label}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <NewsletterSignup />
            </div>
            
            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiZap size={14} />
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiBookOpen size={14} />
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company & Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiUsers size={14} />
                Company
              </h3>
              <ul className="space-y-3 mb-6">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MdOutlineSecurity size={14} />
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Divider */}
          <div className="my-8 border-t border-slate-200" />
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left - Copyright & Info */}
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-600 mb-2">
                © {currentYear} YourLibrary. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <FiMapPin size={12} />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiMail size={12} />
                  <a href="mailto:hello@yourlibrary.com" className="hover:text-indigo-600">
                    hello@yourlibrary.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Center - Language Selector */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <div className="h-4 w-px bg-slate-300" />
              <span className="text-sm text-slate-600 flex items-center gap-1">
                Made with <FiHeart className="text-red-500 animate-pulse" /> and <FiCoffee className="text-amber-700" />
              </span>
            </div>
            
            {/* Right - Social Links */}
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-600 hidden sm:block">
                Follow us:
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full bg-white border border-slate-200 text-slate-600 ${social.color} hover:shadow-md transition-all`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              YourLibrary is a registered trademark. All book titles and authors are property of their respective owners.
              Average rating: 4.8/5 based on 2,457 reviews.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      <ScrollToTop />
      
      {/* Live Chat Support (Example) */}
      <button
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hidden md:flex items-center gap-2"
        aria-label="Live Chat Support"
        onClick={() => window.open('https://wa.me/1234567890', '_blank')}
      >
        <FiMessageSquare size={20} />
        <span className="text-sm font-medium hidden lg:inline">Need Help?</span>
      </button>
    </>
  );
};

// Performance optimization
export default React.memo(Footer);
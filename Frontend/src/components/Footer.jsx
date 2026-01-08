import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiBookOpen,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiHeart,
  FiChevronUp,
  FiRss,
  FiMessageSquare
} from "react-icons/fi";

// Simplified Newsletter Component
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <div className="mb-8 lg:mb-0">
      <h3 className="text-lg font-semibold text-slate-900 mb-3">Join our newsletter</h3>
      <p className="text-slate-600 text-sm mb-4">
        Get curated reading recommendations and learning tips.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none text-sm"
        />
        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Join
        </button>
      </form>
    </div>
  );
};

// Minimal Scroll to Top
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition-colors"
      aria-label="Scroll to top"
    >
      <FiChevronUp size={20} />
    </button>
  );
};

// Main Footer Component - Simplified
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Library", to: "/ebooks" },
        { label: "Categories", to: "/categories" },
        { label: "Recommendations", to: "/recommendations" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", to: "/blog" },
        { label: "Help Center", to: "/help" },
        { label: "Community", to: "/community" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Careers", to: "/careers" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FiTwitter />, label: "Twitter", href: "#" },
    { icon: <FiGithub />, label: "GitHub", href: "#" },
    { icon: <FiLinkedin />, label: "LinkedIn", href: "#" },
    { icon: <FiInstagram />, label: "Instagram", href: "#" },
  ];

  return (
    <>
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Content - 2 column layout on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand & Newsletter */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-slate-900 text-white">
                  <FiBookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Readora</h2>
                  <p className="text-slate-600 text-sm">Learn. Grow. Succeed.</p>
                </div>
              </div>
              <NewsletterSignup />
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
              {footerLinks.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 pt-8">
            
            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-slate-600">
                  © {currentYear} YourLibrary. All rights reserved.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Made with <FiHeart className="inline text-red-500" /> for readers worldwide
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="text-slate-400 hover:text-slate-900 transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <a
                  href="mailto:hello@yourlibrary.com"
                  className="text-slate-600 hover:text-slate-900 text-sm flex items-center gap-2"
                >
                  <FiMail size={14} />
                  Contact us
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="mt-8 text-center">
              <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                <Link to="/privacy" className="hover:text-slate-900">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-slate-900">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="hover:text-slate-900">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
};

export default React.memo(Footer);
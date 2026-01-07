// src/comman/summaryApi.js

export const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
  /* ================= AUTH ================= */
  register: {
    url: "/api/users/register",
    method: "POST",
  },
  login: {
    url: "/api/users/login",
    method: "POST",
  },
  userDetails: {
    url: "/api/users/me",
    method: "GET"
  },
  refreshToken: {
    url: "/api/users/refresh",
    method: "POST",
  },
  profile: {
    url: "/api/users/me",
    method: "GET",
  },
  logout: {
    url: "/api/users/logout",
    method: "POST",
  },
  adminOverview: {
    url: "/api/analytics/admin-overview",
    method: "GET"
  },

  /* ================= CATEGORY ================= */
  getCategories: {
    url: "/api/categories",
    method: "GET",
  },
  createCategory: {
    url: "/api/categories",
    method: "POST",
  },
  updateCategory: (id) => ({
    url: `/api/categories/${id}`,
    method: "PUT",
  }),
  deleteCategory: (id) => ({
    url: `/api/categories/${id}`,
    method: "DELETE",
  }),

  /* ================= EBOOK ================= */
  listEbooks: {
    url: "/api/ebooks",
    method: "GET",
  },
  getEbook: (id) => ({
    url: `/api/ebooks/${id}`,
    method: "GET",
  }),
  uploadEbook: {
    url: "/api/ebooks/upload",
    method: "POST",
  },
  bulkUploadEbooks: {
    url: "/api/ebooks/bulk-upload",
    method: "POST",
  },

  /* ================= ACCESS / STREAM ================= */
  accessEbook: (id) => ({
    url: `/api/ebooks/${id}/access`,
    method: "GET",
  }),
  streamEbook: (id) => ({
    url: `/api/ebooks/${id}/stream`,
    method: "GET",
  }),
};

export default SummaryApi;

export const getEbookFormat = (file) => {
  if (!file || !file.mimetype) return null;

  if (file.mimetype === "application/pdf") return "pdf";
  if (file.mimetype === "application/epub+zip") return "epub";

  return null;
};

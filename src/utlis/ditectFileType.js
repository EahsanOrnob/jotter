const detectFileCategory = (mimetype) => {
  if (mimetype.startsWith("image/")) {
    return "image";
  } else if (mimetype === "application/pdf") {
    return "pdf";
  } else {
    return "note";
  }
};

module.exports = detectFileCategory;

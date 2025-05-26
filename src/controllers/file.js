const {
  addFile,
  showFollowingFiles,
  showFilesOfFollowingFolder,
  toggleFileFavorite,
  renameFile,
  deleteFile,
  showFilesOfFollowingDate,
} = require("../services/file");

const path = require("path");
const detectFileCategory = require("../utlis/ditectFileType");
module.exports = {
  addFile: async (req, res) => {
    const data = req.body;
    data.user_id = req.user_id;
    data.original_name = req.file.originalname;
    data.file_size = req.file.size;
    data.file_type = detectFileCategory(req.file.mimetype);
    data.original_name = req.file.originalname;
    data.file_link = path.basename(req.file.path);
    await addFile(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "File added successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },

  showFollowingFiles: async (req, res) => {
    const data = req.body;
    data.user_id = req.user_id;
    await showFollowingFiles(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "File fetched successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  showFilesOfFollowingFolder: async (req, res) => {
    const data = req.body;
    await showFilesOfFollowingFolder(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "File fetched successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  showFilesOfFollowingDate: async (req, res) => {
    const data = req.body;
    data.user_id = req.user_id;
    const targetDate = new Date(data.date);
    data.startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    data.endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
    await showFilesOfFollowingDate(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "File fetched successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  toggleFileFavorite: async (req, res) => {
    const data = req.body;
    await toggleFileFavorite(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "File updated successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  renameFile: async (req, res) => {
    const data = req.body;
    await renameFile(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "File updated successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
  deleteFile: async (req, res) => {
    const data = req.body;
    await deleteFile(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "File deleted successfully",
          body: results,
        });
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: error.message,
          body: null,
        });
      }
    });
  },
};

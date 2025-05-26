const {
  createFolder,
  showAllFolders,
  toggleFolderFavorite,
  getFavoriteFoldersAndFiles,
  renameFolder,
} = require("../services/folder");

module.exports = {
  createFolder: async (req, res) => {
    const data = req.body;
    data.user_id = req.user_id;
    await createFolder(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "Folder created successfully",
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
  showAllFolders: async (req, res) => {
    const data = req.body;
    data.user_id = req.user_id;
    await showAllFolders(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "Folders fetched successfully",
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
  renameFolder: async (req, res) => {
    const data = req.body;
    await renameFolder(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "Folder updated successfully",
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
  toggleFolderFavorite: async (req, res) => {
    const data = req.body;
    await toggleFolderFavorite(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "Folder updated successfully",
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
  getFavoriteFoldersAndFiles: async (req, res) => {
    const data = req.body;
    data.user_id = req.user_id;
    await getFavoriteFoldersAndFiles(data, (error, results) => {
      if (!error) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "Folders fetched successfully",
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

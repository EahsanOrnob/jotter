// Models
const Folder = require("../models/folder");
const File = require("../models/file");
module.exports = {
  createFolder: async (data, callback) => {
    try {
      const folder = new Folder({
        user_id: data.user_id,
        folder_name: data.folder_name,
      });
      const newFolder = await folder.save();
      return callback(null, newFolder);
    } catch (error) {
      return callback(error);
    }
  },

  showAllFolders: async (data, callback) => {
    try {
      const allFolders = await Folder.find({ user_id: data.user_id });
      return callback(null, allFolders);
    } catch (error) {
      return callback(error);
    }
  },
  renameFolder: async (data, callback) => {
    try {
      const folder = await Folder.findByIdAndUpdate(
        data.folder_id,
        { folder_name: data.folder_name },
        { new: true }
      );
      return callback(null, folder);
    } catch (error) {
      return callback(error);
    }
  },
  toggleFolderFavorite: async (data, callback) => {
    try {
      const folder = await Folder.findById(data.folder_id);
      if (!folder) {
        return callback(new Error("Folder not found"));
      }
      folder.favorite = !folder.favorite;
      await folder.save();
      return callback(null, folder);
    } catch (error) {
      return callback(error);
    }
  },
  getFavoriteFoldersAndFiles: async (data, callback) => {
    try {
      const userFolders = await Folder.find({
        user_id: data.user_id,
      }).select("_id");
      const folderIds = userFolders.map((folder) => folder._id);

      let query = { folder_id: { $in: folderIds }, favorite: true };
      if (data.file_type) query.file_type = data.file_type;

      const userFiles = await File.find(query).sort({ createdAt: -1 });
      return callback(null, userFiles);
    } catch (error) {
      return callback(error);
    }
  },
};

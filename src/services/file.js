const File = require("../models/file");
const Folder = require("../models/folder");
module.exports = {
  addFile: async (data, callback) => {
    try {
      const file = new File({
        folder_id: data.folder_id,
        file_name: data.original_name,
        file_size: data.file_size,
        file_type: data.file_type,
        file_link: data.file_link,
      });
      const newFile = await file.save();
      return callback(null, newFile);
    } catch (error) {
      return callback(error);
    }
  },
  showFollowingFiles: async (data, callback) => {
    try {
      const userFolders = await Folder.find({ user_id: data.user_id }).select(
        "_id"
      );
      const folderIds = userFolders.map((folder) => folder._id);

      let query = { folder_id: { $in: folderIds } };
      if (data.file_type) query.file_type = data.file_type;

      const userFiles = await File.find(query).sort({ createdAt: -1 });

      return callback(null, userFiles);
    } catch (error) {
      return callback(error);
    }
  },

  showFilesOfFollowingFolder: async (data, callback) => {
    try {
      const userFiles = await File.find({ folder_id: data.folder_id });
      return callback(null, userFiles);
    } catch (error) {
      return callback(error);
    }
  },
  toggleFileFavorite: async (data, callback) => {
    try {
      const file = await File.findById(data.file_id);
      if (!file) {
        return callback(new Error("File not found"));
      }
      file.favorite = !file.favorite;
      await file.save();
      return callback(null, file);
    } catch (error) {
      return callback(error);
    }
  },
  renameFile: async (data, callback) => {
    try {
      const file = await File.findByIdAndUpdate(
        data.file_id,
        { file_name: data.file_name },
        { new: true }
      );
      return callback(null, file);
    } catch (error) {
      return callback(error);
    }
  },
  deleteFile: async (data, callback) => {
    try {
      const file = await File.findByIdAndDelete(data.file_id);
      return callback(null, file);
    } catch (error) {
      return callback(error);
    }
  },
  showFilesOfFollowingDate: async (data, callback) => {
    try {
      const userFolders = await Folder.find({ user_id: data.user_id }).select(
        "_id"
      );
      const folderIds = userFolders.map((folder) => folder._id);

      let query = {
        folder_id: { $in: folderIds },
        createdAt: {
          $gte: data.startOfDay,
          $lte: data.endOfDay,
        },
      };
      const userFiles = await File.find(query).sort({ createdAt: -1 });
      return callback(null, userFiles);
    } catch (error) {
      return callback(error);
    }
  },
};

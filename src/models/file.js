const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    folder_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "folder",
      required: true,
    },
    file_name: {
      type: String,
      required: true,
      trim: true,
    },
    file_size: {
      type: Number,
      required: true,
      min: 0,
    },
    file_type: {
      type: String,
      required: true,
      enum: ["pdf", "note", "image"],
      lowercase: true,
    },
    file_link: {
      type: String,
      required: true,
      trim: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    original_name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

FileSchema.index({ folder_id: 1 });
FileSchema.index({ file_type: 1 });
FileSchema.index({ favorite: 1 });

module.exports = mongoose.model("File", FileSchema);
const express = require('express');
const { checkLogin } = require('../middlewares/auth');
const { addFile, showFollowingFiles, showFilesOfFollowingFolder, toggleFileFavorite, renameFile, deleteFile, showFilesOfFollowingDate } = require('../controllers/file');
const router = express.Router();
const Upload = require('../utlis/fileUpload');
router.post('/addFile', checkLogin, Upload.single('file'), addFile);
router.post('/showFollowingFiles', checkLogin, showFollowingFiles);
router.post('/showFilesOfFollowingFolder', checkLogin, showFilesOfFollowingFolder);
router.post('/toggleFileFavorite', checkLogin, toggleFileFavorite);
router.post('/renameFile', checkLogin, renameFile);
router.post('/deleteFile', checkLogin, deleteFile);
router.post('/showFilesOfFollowingDate', checkLogin, showFilesOfFollowingDate);

module.exports = router;
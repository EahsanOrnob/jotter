const express = require('express');
const { createFolder, showAllFolders, toggleFolderFavorite, getFavoriteFoldersAndFiles, renameFolder } = require('../controllers/folder');
const { checkLogin } = require('../middlewares/auth');
const router = express.Router();
router.post('/createFolder', checkLogin, createFolder);
router.post('/showAllFolders', checkLogin, showAllFolders);
router.post('/toggleFolderFavorite', checkLogin, toggleFolderFavorite);
router.post('/getFavoriteFoldersAndFiles', checkLogin, getFavoriteFoldersAndFiles);
router.post('/renameFolder', checkLogin, renameFolder);

module.exports = router;
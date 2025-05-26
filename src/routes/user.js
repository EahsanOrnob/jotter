const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require("../controllers/user");
const { checkLogin } = require('../middlewares/auth');
router.post('/register', register);
router.post('/login', login);
router.post('/updateUser',checkLogin, updateUser);
module.exports = router;
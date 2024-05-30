const express = require('express');
const { registerUser, loginUser , myProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me' , authMiddleware , myProfile);

module.exports = router;
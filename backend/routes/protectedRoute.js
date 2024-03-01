const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
// Protected route
router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ id: req.id });
});

module.exports = router;
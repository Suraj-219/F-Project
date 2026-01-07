const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { authUserMiddleware } = require('../middlewares/auth.middleware');

router.post('/', authUserMiddleware, commentController.addComment);
router.get('/:foodId', authUserMiddleware, commentController.getComments);

module.exports = router;

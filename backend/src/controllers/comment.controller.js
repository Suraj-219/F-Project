const Comment = require('../models/comment.model');
const foodModel = require('../models/food.model');

async function addComment(req, res) {
  const { foodId, text } = req.body;

  if (!foodId || !text) {
    return res.status(400).json({ message: "foodId and text required" });
  }

  const comment = await Comment.create({
    user: req.user._id,
    food: foodId,
    text
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { commentsCount: 1 }
  });

  res.status(201).json({
    message: "Comment added",
    comment
  });
}

async function getComments(req, res) {
  const { foodId } = req.params;

  const comments = await Comment.find({ food: foodId })
    .populate("user", "fullName")
    .sort({ createdAt: -1 });

  res.status(200).json({ comments });
}

module.exports = { addComment, getComments };

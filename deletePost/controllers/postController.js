const postService = require("../services/postService");
module.exports.deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
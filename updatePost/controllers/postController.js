const postService = require("../services/postService");
module.exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
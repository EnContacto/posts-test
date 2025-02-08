const postService = require("../services/postService");
module.exports.getPost = async (req, res) => {
  try {
    const post = await postService.getPost(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
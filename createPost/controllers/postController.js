const postService = require("../services/postService");
module.exports.createPost = async (req, res) => {
  try {
    const imageBuffer = req.file ? req.file.buffer : null;
    const fileName = imageBuffer ? `${Date.now()}.jpg` : null;
    const imageUrl = imageBuffer ? await postService.uploadImageToS3(imageBuffer, fileName, "image/jpeg") : null;
    
    const post = await postService.createPost({ user: req.body.user, content: req.body.content, imageUrl });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
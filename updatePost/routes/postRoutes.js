const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
router.put("/posts/:id", postController.updatePost);
module.exports = router;
const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, getPostById, getPostsByAuthor, updatePost, deletePost } = require("../controllers/postsController");

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/author/:authorId", getPostsByAuthor);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);  

module.exports = router;

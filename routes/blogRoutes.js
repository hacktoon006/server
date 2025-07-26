const express = require("express");
const router = express.Router();
const { getAllBlogs, getBlogById } = require("../controllers/blogController");

// GET /api/blogs - fetch all blogs
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
module.exports = router;

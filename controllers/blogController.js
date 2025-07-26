const Blog = require("../models/Blogs");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean(); // .lean() for performance
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  getAllBlogs,getBlogById,  
};

const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const { createBlog, editBlog, deleteBlog, viewAllBlogs, getSingleBlogData, getAllCategories } = require("../controller/BlogController");
const upload = require("../middleware/multer");
const authorizeAdmin = require("../middleware/AdminAuth");
const router = express.Router();

router.post("/createBlog", isAuthenticated, authorizeAdmin, upload.single("coverImage"), createBlog);
router.patch("/editBlog/:slug", isAuthenticated, authorizeAdmin, upload.single("coverImage"), editBlog);
router.delete("/deleteBlog/:slug", isAuthenticated, authorizeAdmin, deleteBlog);
router.get("/getAllBlog", viewAllBlogs);
router.get("/getSingleBlogData/:slug", getSingleBlogData);
router.get("/getAllCategory", getAllCategories);
module.exports = router;
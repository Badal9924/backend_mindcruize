const { hash } = require("bcrypt");
const BlogModel = require("../Model/Blog");
const { create } = require("../Model/User");
const cloudinary = require("../utils/cloudinary");
const slugify = require("slugify");


function generateMetaDescription(htmlContent, length = 160) {
    if (!htmlContent) return "";
    const text = htmlContent.replace(/<[^>]*>/g, ""); // remove HTML tags
    return text.substring(0, length).trim();
}

const createBlog = async (req, res) => {
    try {
        const { title, content, author, category, tags, publishedDate } = req.body;
        const slug = slugify(title, { lower: true, strict: true }) || Date.now();
        // check if blog with same title exists
        const existingBlog = await BlogModel.findOne({ slug });
        if (existingBlog) {
            return res.status(400).json({
                message: "Blog with same title already exists",
                success: false,
                error: true
            });
        }
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Image is required...",
                success: false,
                error: true
            });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "blogsInage" }, // folder name in cloudinary
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(file.buffer); // send buffer to cloudinary
        });

        const metaDescription = generateMetaDescription(content, 160);

        const newBlog = await BlogModel.create({
            title,
            metaDescription,
            slug,
            content,
            category,
            author,
            tags,
            publishedDate,
            coverImage: result.secure_url,   // Cloudinary image URL
            publicId: result.public_id     // optional: store public_id for delete/update
        });

        return res.status(200).json({
            data: newBlog,
            success: true,
            error: false,
            message: "Blog created sucessfully..."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An internal error Occur.."
        });
    }
}

const editBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, content, author, category, tags, publishedDate } = req.body;
        const file = req.file;
        const existingBlog = await BlogModel.findOne({ slug });
        if (!existingBlog) {
            return res.status(400).json({
                message: "Blog not found",
                error: true,
                success: false
            })
        }
        if (title) existingBlog.title = title;
        if (category) existingBlog.category = category;
        if (tags) existingBlog.tags = tags;
        if (content) existingBlog.content = content;
        if (publishedDate) existingBlog.publishedDate = publishedDate;
        if (author) existingBlog.author = author;
        if (file) {
            // delete old image from cloudinary
            if (existingBlog.publicId) {
                await cloudinary.uploader.destroy(existingBlog.publicId);
            }

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "blogsInage" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.buffer);
            });

            existingBlog.coverImage = result.secure_url;
            existingBlog.publicId = result.public_id;
        }

        await existingBlog.save();

        return res.status(200).json({
            data: existingBlog,
            success: true,
            error: false,
            message: "Blog updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An internal error Occur.."
        });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const existingBlog = await BlogModel.findOne({ slug });
        if (!existingBlog) {
            return res.status(404).json({
                message: "Blog not found",
                success: false,
                error: true
            });
        }

        if (existingBlog.publicId) {
            await cloudinary.uploader.destroy(existingBlog.publicId);
        }

        await BlogModel.deleteOne({ slug });

        return res.status(200).json({
            message: "Blog deleted successfully...",
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An internal error Occur.."
        });
    }
}

const viewAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;
        const total = await BlogModel.countDocuments();
        const totalPage = Math.ceil(total / limit);

        const allBlog = await BlogModel.find({})
            .sort({ createdAt: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        return res.status(200).json({
            success: true,
            error: false,
            message: "blogs fetched successfully",
            total,
            data: allBlog,
            totalPage,
            hasmore: page * limit < total
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An internal error Occur.."
        });
    }
}

const getSingleBlogData = async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(slug);
        const singleBlogData = await BlogModel.findOne({ slug });
        if (!singleBlogData) {
            return res.status(404).json({
                message: "Blog not found",
                success: false,
                error: true
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            message: "Blog Data fetched successfully :)",
            data: singleBlogData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An internal error Occur.."
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const AllCategories = await BlogModel.distinct("category");
        res.status(200).json({
            success: true,
            error: false,
            data: AllCategories
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An internal error Occur.."
        });
    }
}

module.exports = {
    createBlog,
    editBlog,
    deleteBlog,
    viewAllBlogs,
    getSingleBlogData,
    getAllCategories
}
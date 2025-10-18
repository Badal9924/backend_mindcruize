const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog title is required"],
        trim: true,
    },
    metaDescription: {
        type: String,
        required: [true, "Meta Description is Required"],
        trim: true,
        maxLength: 160
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        required: [true, "Blog title is Required"],
    },
    category: {
        type: String,
        required: [true, "Category is Required"],
        trim: true,
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    publishedDate: {
        type: Date,
        default: Date.now,
        required: [true, "Published date is required"]
    },

    publicId: {
        type: String
    },

    coverImage: {
        type: String,
        default: "",
        require: [true, "Cover image is required"]
    },
},
    { timestamps: true }
);

const BlogModel = mongoose.model("blogs", BlogSchema);
module.exports = BlogModel;
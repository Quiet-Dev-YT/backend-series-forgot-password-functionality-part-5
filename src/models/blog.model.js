const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true})

const Blog = mongoose.models.blog || mongoose.model('blog', BlogSchema)

module.exports = Blog
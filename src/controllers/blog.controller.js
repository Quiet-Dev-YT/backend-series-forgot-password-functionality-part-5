const { Blog } = require("../models")

class BlogController {
    async create (req, res) {
        try {
            const { title, content, isPublished} = req.body

            const blog = await Blog.create({
                title, 
                content,
                author: req.user._id,
                isPublished
            })

            return res.status(201).json({message: "Blog created successfully!", blog})
        }catch(e){
            return res.status(500).json({ message: "Server error", error: e.message })
        }
    }

    async getAll (req, res) {
        try {   
            const blogs = await Blog.find({ isPublished: true}).populate("author", "name email_address").sort({ createdAt: -1})

            return res.status(200).json({ blogs })
        }catch(e){
            return res.status(500).json({ message: "Server Error:", error: e.message})
        }
    }

    async getById (req, res) {
        try{
            const {id} = req.params

            const blog = await Blog.findById(id).populate("author", "name email_address")

            if(!blog || !blog.isPublished){
                return res.status(404).json({ message: "Blog not found"})
            }

            return res.status(200).json({ blog })
        }catch(e){
            return res.status(500).json({ message: "Server Error:", error: e.message})
        }
    }

    async update (req, res) {
        try {
            const { id } = req.params
            const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true})

            if(!blog){
                return res.status(404).json({ message: "Blog not found"})
            }

            return res.status(200).json({message: "Blog updated successfully",  blog })
        }catch(e){
            return res.status(500).json({ message: "Server Error", error:e.message})
        }
    }

    async delete (req, res) {
        try {
            const {id} = req.params
            await Blog.findByIdAndDelete(id)

            return res.status(200).json({ message: "Blog deleted successfully"})
        }catch(e){
            return res.status(500).json({ message: "Server Error:", error: e.message})
        }
    }
}

module.exports = new BlogController()
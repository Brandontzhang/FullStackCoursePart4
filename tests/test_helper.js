const blog = require('../models/blog')
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "Blog title",
        author: "Blog author",
        url: "Blog url",
        likes: 10
    }
]

const getBlogs = async () => {
    const blogs = await Blog.find()
    return blogs.map(b => b.toJSON())
}

module.exports = {
    initialBlogs, getBlogs
}
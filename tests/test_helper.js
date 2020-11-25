const Blog = require('../models/blog')
const User = require('../models/user') 

const initialBlogs = [
    {
        title: "Blog title",
        author: "Blog author",
        url: "Blog url",
        likes: 10
    }
]

const initialUsers = [
    {
        username: 'test user 1',
        name: "test 1"
    }
]

const getBlogs = async () => {
    const blogs = await Blog.find()
    return blogs.map(b => b.toJSON())
}

const getUsers = async() => {
    const users = await User.find()
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, getBlogs, getUsers
}
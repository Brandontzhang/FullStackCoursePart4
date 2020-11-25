const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find().populate('users', {username: 1, name: 1})
  return response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  let inputBlog = request.body

  const user = await User.findById(body.userId)

  if (!inputBlog.title || ! inputBlog.url) {
    return response.status(400).end()
  }

  if (!inputBlog.likes) {
    inputBlog = {
      ...inputBlog, 
      likes: 0,
      user: userId
    }
  }
  const newBlog = new Blog(inputBlog)
  const result = await newBlog.save()

  user.blogs = users.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogsRouter
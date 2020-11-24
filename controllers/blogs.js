const blogsRouter = require('express').Router()
const blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await blog.find()
  return response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  let inputBlog = request.body

  if (!inputBlog.title || ! inputBlog.url) {
    return response.status(400).end()
  }

  if (!inputBlog.likes) {
    inputBlog = {
      ...inputBlog, 
      likes: 0
    }
  }
  const newBlog = new blog(inputBlog)

  const result = await newBlog.save()
  return response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request, response, next) => {
  await blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  await blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogsRouter
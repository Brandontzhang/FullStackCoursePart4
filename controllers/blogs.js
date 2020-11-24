const blogsRouter = require('express').Router()
const blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {

  const blogs = await blog.find()
  return response.json(blogs)

})

blogsRouter.post('/', (request, response) => {
  const newBlog = new blog(request.body)

  // const result = await newBlog.save()
  // return response.status(201).json(result)

  newBlog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
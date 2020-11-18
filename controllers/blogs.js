const blogsRouter = require('express').Router()
const blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  blog
    .find()
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const newBlog = new blog(request.body)

  console.log(request.body)

  newBlog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
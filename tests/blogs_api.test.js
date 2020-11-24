const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: "Blog title",
        author: "Blog author",
        url: "Blog url",
        likes: 10
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is one blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('there is a specific blog', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(b => b.title)
    expect(contents).toContain('Blog title')
})

test('Creating a blog increases the size', async () => {
    const newBlog = new Blog({
        title: "Blog title 2",
        author: "Blog author 2",
        url: "Blog url 2",
        likes: 12
    })

    await api
        .post('/api/blogs')
        .send({
            title: "Blog title 2",
            author: "Blog author 2",
            url: "Blog url 2",
            likes: 12
        })
        .expect(201)
        .expect('Content-type', /application\/json/)

    // await newBlog.save()

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const content = response.body.map(b => b.title)
    expect(content).toContain('Blog title 2')
})

afterAll(() => {
    mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let b of helper.initialBlogs) {
        let newBlog = new Blog(b)
        await newBlog.save()
    }

})

describe('Sectioning off tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

test('there is one blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('there is a specific blog', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(b => b.title)
    expect(contents).toContain('Blog title')
})

test('Creating a blog increases the size', async () => {
    // this variable isn't working??
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
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const content = response.body.map(b => b.title)
    expect(content).toContain('Blog title 2')
})

test('delete a blog', async () => {
    const initialBlogs = await helper.getBlogs()
    const blogToDelete = initialBlogs[0]

    await api.delete(`/api/blogs/${blogToDelete._id}`)
        .expect(204)

    const endBlogs = await helper.getBlogs()

    expect(endBlogs).toHaveLength(initialBlogs.length - 1)

    const contents = endBlogs.map(b => b._id)
    expect(contents).not.toContain(blogToDelete._id)

})

// 4.9, don't really know what to do
// test('test id exists', async () => {
//     const initialBlogs = await helper.getBlogs()
//     const contents = initialBlogs.map(b => b._id)
//     contents.forEach(c => {
//         expect(c).toBeDefined()
//     })
// })

test('Likes missing', async () => {
    newBlog = {
        title: "No likes",
        author: "Blog author 2",
        url: "Blog url 2",
    }

    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogs = await helper.getBlogs()
    expect(blogs[blogs.length - 1]).toHaveProperty('likes', 0)
})

test('Missing title or url', async () => {
    newBlog = {
        author: "didn't write anything",
        likes: 10
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
})

test('Update test', async () => {
    const initialBlogs = await helper.getBlogs()
    let firstBlog = initialBlogs[0]

    const updatedBlog = {
        ...firstBlog,
        title: "updating blog"
    }

    await api
        .put(`/api/blogs/${firstBlog._id}`)
        .send(updatedBlog)
        .expect(204)

    const updatedBlogs = await helper.getBlogs()
    firstBlog = updatedBlogs[0]

    expect(firstBlog).toHaveProperty('title', 'updating blog')
})

afterAll(() => {
    mongoose.connection.close()
})
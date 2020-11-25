const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')

describe('Test database starts with one user', () => {
    beforeEach(async () => {
        await User.deleteMany()

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with new username', async () => {
        const usersAtStart = await helper.getUsers()

        const newUser = {
            username: 'test user 2',
            name: "test 2",
            password: "testing"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain('test user 2')
    })

    test('duplicate usernames are not allowed', async() => {
        const usersAtStart = await helper.getUsers()

        const newUser = {
            username: 'root', 
            password: 'duplicate'
        }
        
        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
        const usersAtEnd = await helper.getUsers()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})
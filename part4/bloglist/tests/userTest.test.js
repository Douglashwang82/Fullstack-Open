const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const User = require('../models/userModel')
const initialUsers = [
    {
        username: "Douglas",
        name: "douglas",
        passwordHash: "qwuiepr"
    },
    {
        username: "Robin",
        name: "robin",
        passwordHash: "qwerrttyrew"
    },
    {
        username: "Rolex",
        name: "rolex",
        passwordHash: "asdfgh"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})


describe('Fundamental tests', () => {
    test('Post a User Valid', async () => {
        const newUser = {
            username: "Ben",
            name: "ben",
            password: "password"
        }
        await api
            .post('/api/user')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/user')
        expect(response.body).toHaveLength(4)
    }
    )

    test('Get All User', async () => {
        const response = await api.get('/api/user')
        expect(response.body).toHaveLength(3);
    })

    test('Post a User Invalid unUnique', async () => {
        const newUser = {
            username: "Douglas",
            name: "qwert",
            password: "something"
        }
        const response = await api
            .post('/api/user')
            .send(newUser)
            .expect(400)
        expect(response.body.error).toContain('username already exists in DB')
    })

    test('Post a User Invalid length limit', async () => {
        const newUser = {
            username: "AH",
            name: "qwert",
            password: "123456"
        }
        const response = await api
            .post('/api/user')
            .send(newUser)
            .expect(400)
        expect(response.body.error).toContain('username and password need to be at least 3')
    })
})
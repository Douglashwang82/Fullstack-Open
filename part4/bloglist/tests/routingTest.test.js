const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app');
const api = supertest(app)

const Blog = require('../models/blogModel');

const initialBlog = [
    {
        title: 'First',
        author: 'Douglas',
        url: "123",
        likes: 1
    },
    {
        title: 'Second',
        author: 'Robin',
        url: "123",
        likes: 2
    },
    {
        title: 'Third',
        author: 'Rolax',
        url: "123",
        likes: 3
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlog)
});

test('Test GET blog', async () => {
    const response = await api.get('/api/blogs')
    // const titles = response._body.map(res => res.title);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(initialBlog.length);
    expect(response.type).toBe("application/json")
}
)

test('Test POST blog', async () => {
    const newBlog = {
        title: "Fifth",
        author: "Newmen",
        url: "123",
        likes: 30
    }
    // await api
    //     .post('/api/blogs')
    //     .send(newBlog)
    //     // .expect(201)
    //     // .expect('Content-Type', /application\/json/)
    const postCall = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(t => t.title);
    expect(response.body).toHaveLength(initialBlog.length + 1)
    expect(titles).toContain('Fifth')

})

test('Test GET blog _id to id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map(r => r.id)
    id.map(r => expect(r).toBeDefined())
})

test('Test GET blog __v delted', async () => {
    const response = await api.get('/api/blogs')
    const __v = response.body.map(r => r.__v)
    __v.map(r => expect(r).toBeUndefined())
})

test('Test GET blogs likes defined', async () => {
    const response = await api.get('/api/blogs')
    const likes = response.body.map(r => r.likes)
    likes.map(r => expect(r).toBeDefined())
})

test('Test missing title or url props', async () => {
    const readyBlog = {
        autho: "Something",
        likes: 30,
    }
    await api
        .post('/api/blogs')
        .send(readyBlog)
        .expect(400)
})

test('Test delete a blog', async () => {
    const customId = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
    const newBlog = {
        title: "newBlog",
        author: "no important",
        url: "123",
        likes: 10,
        _id: customId
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    await api
        .delete(`/api/blogs/${customId}`)
        .expect(200)
})

test('Test update a blog', async () => {
    const customId = mongoose.Types.ObjectId('4edd40c86762e0fb12000004');
    const newBlog = {
        title: "newBlog",
        author: "no important",
        url: "123",
        likes: 10,
        _id: customId
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    const updatedBlog = {
        title: "updatedBlog",
        author: "no important",
        url: "123",
        likes: 10,
    }
    const response = await api
        .put(`/api/blogs/${customId}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


afterAll(() => {
    mongoose.connection.close();
}
)
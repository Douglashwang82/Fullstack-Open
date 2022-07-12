const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
blogRouter.get('/', async (request, response, next) => {
    // Blog
    //     .find({})
    //     .then(result => {
    //             response.json(result)
    //     })
    try {
        const result = await Blog.find({});
        response.json(result);

    } catch (exception) {
        next(exception)
    }
})

blogRouter.post('/', async (request, response, next) => {
    // const blog = new Blog(request.body)
    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
    const user = await User.findOne({});
    const withUser = {
        ...request.body,
        user: user._id
    }
    try {
        const newBlog = new Blog(withUser)
        const saveBlog = await newBlog.save()
        response.status(201).json(saveBlog)
        
    } catch (exception) {
        response.status(400).send({exception})
    }

})

blogRouter.delete('/:id', (request, response, next) =>{
    try {
        Blog
            .findByIdAndRemove(request.params.id)
            .then(() => response.status(200).end())
    } catch (exception) {
        response.status(404).end();
    }
}
)

blogRouter.put('/:id', (request, response, next) =>{
    try {
        Blog
            .findByIdAndUpdate(request.params.id, request.body)
            .then(res => response.json(res))
    } catch (exception) {
        response.status(404).end();
    }
}
)

module.exports = blogRouter;
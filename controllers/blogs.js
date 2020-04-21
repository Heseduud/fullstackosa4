const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const _ = require('lodash')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON())) 
})

blogsRouter.post('/', async (req, res) => {
    let blog = null

    if (_.has(req.body, 'likes')) {
        blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: req.body.likes
        })
    } else {
        blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            url: req.body.url,
            likes: 0
        })
    }
    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }

    const modifiedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(modifiedBlog.toJSON())

})

module.exports = blogsRouter
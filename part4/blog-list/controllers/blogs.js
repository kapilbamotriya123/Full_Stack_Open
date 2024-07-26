const blogRouter = require(`express`).Router()
const { Query } = require("mongoose")
const Blog = require(`../models/blog`)


blogRouter.get('/', async (request,response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/',async(request, response) => {
    const body = request.body
    if (!body.title || !body.author || !body.url) {
        return response.status(400).json({ error: 'title, author, and url are required' });
      }
    let newBlog = {
        title: body.title,
        author:body.author,
        url:body.url,
        likes:body.likes
    }


    const blog = new Blog(newBlog)
    try{
    const result = await blog.save()
    response.status(201).json(result)
    } catch (error) {
        if (error.name === 'ValidationError') {
          response.status(400).json({ error: 'title is required' });
        }
    }
})

blogRouter.delete('/:id', async(request,response) => {
    const id = request.params.id
    const result = await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogRouter.put('/:id', async(request,response) => {
    const id = request.params.id
    const body = request.body
    const result = await Blog.findByIdAndUpdate(id,body,{new: true})
    response.json(result)
})


module.exports = blogRouter
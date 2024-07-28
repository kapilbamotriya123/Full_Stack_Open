const blogRouter = require(`express`).Router()
const User = require('../models/user')
const Blog = require(`../models/blog`)


blogRouter.get('/', async (request,response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, password:1});
    response.json(blogs)
})

blogRouter.post('/',async(request, response) => {
    const body = request.body
    if (!body.title || !body.author || !body.url) {
        return response.status(400).json({ error: 'title, author, and url are required' });
      }
    const user = await User.findOne({})
    let newBlog = {
        title: body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        user:user.id
    }


    const blog = new Blog(newBlog)
    console.log(user);
    try{
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

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
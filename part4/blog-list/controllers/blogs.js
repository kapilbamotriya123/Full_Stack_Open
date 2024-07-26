const blogRouter = require(`express`).Router()
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

    }
)

module.exports = blogRouter
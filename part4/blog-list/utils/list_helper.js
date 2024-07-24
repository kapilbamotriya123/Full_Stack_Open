const blog = require("../models/blog")

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
   const likes = blogs.map(blog => blog.likes)
    return likes.reduce((sum, item) => {
        return  item + sum
        },0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const maxLikes = Math.max(...likes)
       
    return blogs.find(blog => blog.likes===maxLikes)
}

const mostBlogs = (blogs) => {
    const authors = []
    blogs.forEach(blog => {
        const author = authors.find(author => author.name ===blog.author)
        console.log(author)
        if(author === 'undefined') {
            const newAuthor =  {
                name: blog.author,
                count: 1 
            }
        }

        if (author) {
            const updatedAuthor = {...author, count: count + 1}

            authors.map(author => {
                author.name !== updatedAuthor
                ? author
                : updatedAuthor
            })
        }
        
    })
    console.log(authors)
}

mostBlogs(blogs)
module.exports  = {dummy, totalLikes, favoriteBlog}
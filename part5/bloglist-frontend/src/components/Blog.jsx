import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  return (
  <div>
    {blog.title} <strong>{blog.author} </strong>
    <button onClick={() => dispatch(likeBlog(blog))}>like: {blog.likes}</button>
    <button onClick={() => dispatch(deleteBlog(blog))}>delete</button>
    
  </div>
)};

export default Blog;

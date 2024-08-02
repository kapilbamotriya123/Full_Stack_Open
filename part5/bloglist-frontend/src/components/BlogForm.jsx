const BlogForm = (props) => {
    return(
        <div>
            <h2>Create New</h2>
            <form onSubmit={props.addBlog}>
                <div>
                title:
                <input name = 'title' type = 'text' value = {props.title} onChange={(event) => props.setTitle(event.target.value)}/>
                </div>

                <div>
                author:
                <input name = 'author' type = 'text' value = {props.author} onChange={(event) => props.setAuthor(event.target.value)}/>
                </div>
                <div>
                url:
                <input name = 'url' type = 'text' value = {props.url} onChange={(event) => props.setUrl(event.target.value)}/>
                </div>
                <button type ='submit'>create</button>
            </form>
        </div>
    )
}
export default BlogForm
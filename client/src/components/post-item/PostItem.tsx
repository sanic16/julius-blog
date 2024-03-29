import { Link, useNavigate } from "react-router-dom"
import classes from './PostItem.module.css'
import Author from "../author/Author"

const PostItem = (
    {
        post
    }:{
        post: Post
    }
) => {
  const navigate = useNavigate()
  const reducedDescription = post.description.length > 100 ? post.description.slice(0, 100) + '...' : post.description
  const reducedTitle = post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title 
  return (
    <div className={classes.post}>
            <div className={classes.header}>  
                <Link to={`/post/${post._id}`}>          
                    <div className={classes.thumbnail}>
                        <img src={post.thumbnail} alt="thumbnail" />
                    </div>
                    <h4>{reducedTitle}</h4>
                </Link>
            </div>
            <div className={classes.body}>
                <p
                    dangerouslySetInnerHTML={{__html: reducedDescription}}
                >

                </p>
                <div className={classes.info}>
                    <Author
                        creator={post.creator}
                        createdAt={post.createdAt}
                    />
                    <button
                        onClick={ () => navigate(`/posts/categories/${post.category}`)}
                        className="btn "
                    >
                        {post.category}
                    </button>
                </div>
            </div>
    </div>
  )
}

export default PostItem
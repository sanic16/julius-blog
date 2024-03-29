import { Link } from 'react-router-dom'
import { useGetAuthorQuery } from '../../store/slices/usersApiSlice'
import classes from './Author.module.css' 

const Author = (
    {
        creator,
        createdAt
    }:{
        creator: string,
        createdAt: string
    }
) => {
  const { data: author} = useGetAuthorQuery(creator)  
  return (
    
      <div className={classes.author}>
        <Link to={`/posts/authors/${creator}`}>
          <div className={classes.author__thumbnail}>
              <img src={author?.avatar} alt={creator}/>
          </div>
          <div className={classes.author__info}>
              <small>
                  {author?.name}
              </small>
              <small>
                  {new Date(createdAt).toLocaleDateString()}
              </small>
          </div>  
        </Link>
      </div>
    
  )
}

export default Author
import { Link } from 'react-router-dom'
import { useGetAuthorQuery } from '../../store/slices/usersApiSlice'
import './author.css'

const Author = (
    {
        creator,
        thumbnail,
        createdAt,
    }:{
        creator: string,
        thumbnail: string,
        createdAt: string
    }
) => {
  const { data: author} = useGetAuthorQuery(creator)  
  return (
    <Link to={`/posts/authors/${creator}`}>
      <div className='author'>
        <div className='author__thumbnail'>
            <img src={thumbnail} alt={creator}/>
        </div>
        <div className='author__info'>
            <small>
                {author?.name}
            </small>
            <small>
                {new Date(createdAt).toLocaleDateString()}
            </small>
        </div>  
      </div>
    </Link>
  )
}

export default Author
import classes from './Authors.module.css'
import { useGetAuthorsQuery } from '../../store/slices/usersApiSlice'
import Loader from '../../components/loader/Loader'
import { Link } from 'react-router-dom'

const Authors = () => {
  const { data, isError, isLoading } = useGetAuthorsQuery()
  return (
    <section>
      {
          isLoading ? (
            <Loader />
          ) : isError ? (
            <h3>
              Error
            </h3>
          ) : (
            <div className={classes.authors}>
            {
              data?.map(author => (
                <div key={author._id} className={classes.author}>
                  <Link to={`/posts/authors/${author._id}`}>
                    <div className={classes.avatar}>
                      <img src={author.avatar} alt={author.name} />
                    </div>
                    <div className={classes.info}>
                      <h5>{author.name}</h5>
                      <p>Posts: {author.posts}</p>
                      <p>Joined: {new Date(author.createdAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                </div>
              ))
            }
            </div>
          )
        }
    </section>
  )
}

export default Authors
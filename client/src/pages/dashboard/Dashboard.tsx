import classes from './Dashboard.module.css'
import { useGetPostsByAuthorQuery } from '../../store/slices/postsApiSlice'
import Loader from '../../components/loader/Loader'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useSelector((state: {auth: AuthState}) => state.auth)
  const { data, isLoading, isError } = useGetPostsByAuthorQuery(user?.id || '')
  return (
    <section className={classes.dashboard}>
      <h1>
        Dashboard
      </h1>
      <div className={classes.dashboard__posts}>
      {
          isLoading ? (
            <Loader />
          ) : isError || !data ? (
            <h3>
                Error al cargar las publicaciones
            </h3>
          ) : (
            <>
              {
                data?.posts.map(post => (
                  <div className={classes.post} key={post._id}>

                    <div className={classes.info}>
                      <Link to={`/post/${post._id}`}>
                        <div className={classes.thumbnail}>
                          <img src={post.thumbnail} alt={post.title} />
                        </div>
                        <div className={classes.details}>
                          <h5>
                            {post.title}
                          </h5>
                          <p>
                            creado el <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </p>
                        </div>  
                      </Link>
                    </div>

                    <div className={classes.actions}>
                      <button className='btn sm primary'>
                        Ver Post
                      </button>
                      <button className='btn sm white'>
                        Editar
                      </button>
                      <button className='btn warning sm'>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              }
            </>
          )
        }
      </div>
    </section>
  )
}

export default Dashboard
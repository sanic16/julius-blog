import classes from './Dashboard.module.css'
import { useDeletePostMutation, useGetPostsByAuthorQuery } from '../../store/slices/postsApiSlice'
import Loader from '../../components/loader/Loader'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { user } = useSelector((state: {auth: AuthState}) => state.auth)
  const { data, isLoading, isError } = useGetPostsByAuthorQuery(user?.id || '')
  const navigate = useNavigate()
  const [deletePost, {isLoading: isDeleting}] = useDeletePostMutation()
  const handleDeletePost = async(id: string) => {
    try{
      await deletePost(id).unwrap()
      toast.success('Publicación eliminada')
    }catch(error){
      toast.error('Error al eliminar la publicación')
    }
  }
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
                      <button 
                        className='btn sm primary'
                        onClick={() => navigate(`/post/${post._id}`)}
                      >
                        Ver Post
                      </button>
                      <button 
                        className='btn sm white'
                      >
                        Editar
                      </button>
                      <button 
                        className={`btn sm warning ${isDeleting ? 'disabled' : ''}`}
                        onClick={() => handleDeletePost(post._id)}
                        disabled={isDeleting}
                      >
                          {
                            !isDeleting ? 'Eliminar' : 'Eliminando...'
                          }
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
import { useNavigate, useParams } from "react-router-dom"
import Author from "../../components/author/Author"
import Loader from "../../components/loader/Loader"
import { useDeletePostMutation, useGetPostQuery } from "../../store/slices/postsApiSlice"
import classes from './PostDetail.module.css'
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

const PostDetail = () => {
  const { id } = useParams<{id: string}>()
  const {
    data,
    isError,
    isLoading
  } = useGetPostQuery(id!)
  const navigate = useNavigate()
  const [deletePost, {isLoading: isDeleting}] = useDeletePostMutation()
  const { user } = useSelector((state: {auth: AuthState}) => state.auth)
  const handleDeletePost = async(id: string) => {
    try{
      await deletePost(id).unwrap()
      toast.success('Publicación eliminada')
      navigate('/dashboard')
    }catch(error){
      toast.error('Error al eliminar la publicación')
    }
  }

  return (
    <section className={classes.post__detail}>
      {
          isLoading ? (
            <Loader />
          ) : isError || !data ? (
            <h3>
              Error loading categories
            </h3>
          ) : (
            <div>
              {
                <>
                <div className={classes.author}>
                    <Author 
                      creator={data.post.creator}
                      createdAt={data.post.createdAt}
                    />
                    {
                      user?.id === data.post.creator && (
                        <div
                          className={classes.actions}
                        >
                            <button 
                              className="btn white"
                              onClick={() => navigate(`/posts/${data.post._id}/edit`)}
                            >
                              Editar
                            </button>
                            <button 
                              className={`btn warning ${isDeleting ? 'disabled' : ''}`}
                              onClick={() => handleDeletePost(data.post._id)}
                            >
                              {isDeleting ? 'Eliminando...' : 'Eliminar'}
                            </button>
                         </div>  
                      )
                    }
                </div>  
                <div
                  className={classes.post__body}
                >
                  <h2>
                    {data.post.title}
                  </h2>
                  <div
                    className={classes.thumbnail}
                  >
                    <img src={data.post.thumbnail} alt={data.post.title} />
                  </div>
                  <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{__html: data.post.description}}
                  >

                  </div>
                </div>
                </>  
              }
            </div>
          )
        }     
    </section>
  )
}

export default PostDetail
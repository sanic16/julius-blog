import { useParams } from "react-router-dom"
import Author from "../../components/author/Author"
import Loader from "../../components/loader/Loader"
import { useGetPostQuery } from "../../store/slices/postsApiSlice"
import classes from './PostDetail.module.css'

const PostDetail = () => {
  const { id } = useParams<{id: string}>()
  const {
    data,
    isError,
    isLoading
  } = useGetPostQuery(id!)



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
                    <div
                      className={classes.actions}
                    >
                        <button className="btn white">
                          Editar
                        </button>
                        <button className="btn warning">
                          Eliminar
                        </button>
                    </div>  
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
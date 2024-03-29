import { useGetPostsByCategoryQuery } from '../../store/slices/postsApiSlice'
import Loader from '../loader/Loader'
import PostItem from '../post-item/PostItem'
import classes from './PostsByCategory.module.css'

const PostsByCategory = (
    {
        categoryID
    }:{
        categoryID: string
    }
) => {
  const { data, isLoading, isError } = useGetPostsByCategoryQuery(categoryID)
  return (
    <div className={classes.category__posts}>
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
                  <PostItem
                    key={post._id}
                    post={post}
                  />
                ))
              }
            </>
          )
        }
    </div>
  )
}

export default PostsByCategory
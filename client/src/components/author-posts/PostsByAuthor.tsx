import { useGetPostsByAuthorQuery } from '../../store/slices/postsApiSlice'
import Loader from '../loader/Loader'
import PostItem from '../post-item/PostItem'
import classes from './PostsByAuthor.module.css'

const PostsByAuthor = (
    {
        authorID
    }:{
        authorID: string
    }
) => {
  const { data, isLoading, isError } = useGetPostsByAuthorQuery(authorID)
  return (
    <div
    className={`${isLoading || isError ? 'center__spinner' : null}`}
    >
        {
          isLoading ? (
            <Loader />
          ) : isError ? (
            <h3>
              Error loading categories
            </h3>
          ) : (
            <div
          className={classes.posts}
            >
              {
                data?.posts.map(post => (
                  <PostItem
                    key={post._id}
                    post={post}
                  />
                ))
              }
            </div>
          )
        }
    </div>
  )
}

export default PostsByAuthor
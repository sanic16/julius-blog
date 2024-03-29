import { useGetPostsQuery } from "../../store/slices/postsApiSlice"
import Loader from "../loader/Loader"
import PostItem from '../post-item/PostItem'
import classes from './Posts.module.css'

const Posts = () => {
  const { data, isLoading, isError } = useGetPostsQuery()  
  return (
    <div>
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

export default Posts
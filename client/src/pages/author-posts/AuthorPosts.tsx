import { useParams } from "react-router-dom"
import PostsByAuthor from "../../components/author-posts/PostsByAuthor"

const AuthorPosts = () => {
  const authorID = useParams<{author: string}>().author!
  return (
    <section className="posts">
      <PostsByAuthor authorID={authorID} />
    </section>
  )
}

export default AuthorPosts
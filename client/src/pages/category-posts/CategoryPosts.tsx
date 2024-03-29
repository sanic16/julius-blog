import { useParams } from 'react-router-dom'
import PostsByCategory from '../../components/category-posts/PostsByCategory'
import './categoryPosts.css'

const CategoryPosts = () => {
  const { category } = useParams<{category: string}>()
  return (
    <section className="category__posts">  
        <PostsByCategory categoryID={category!}/>
    </section>
  )
}

export default CategoryPosts
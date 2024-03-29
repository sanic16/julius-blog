
import { setCategories } from "../../store/slices/catSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../store/slices/postsApiSlice"
import './footer.css'
import { useEffect } from "react"
const Footer = () => {
  const {
    data: categories,
    
  } = useGetCategoriesQuery()
  const dispatch = useDispatch()
  useEffect(() => {
    if(categories){
      dispatch(setCategories({cat: categories.categories}))
    }
  
  }, [categories, dispatch])
  return (
    <footer className="footer">
      <div 
        className={`container footer__container`}>      
            <div className="footer__categories">
              {
                categories?.categories.map(category => (
                  <Link 
                    to={`/posts/categories/${category}`} 
                    key={category}
                    className="btn sm outline"
                  >
                    {category}
                  </Link>
                ))
              }
            </div>
          
        </div>
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} <span>SanicBlog</span>. Todos los derechos reservados.
          </p>
        </div>
      
      
    </footer>
  )
}

export default Footer
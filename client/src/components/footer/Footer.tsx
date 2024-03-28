import { Link } from "react-router-dom"
import { useGetCategoriesQuery } from "../../store/slices/postsApiSlice"
import './footer.css'
const Footer = () => {
  const {
    data: categories,
    
  } = useGetCategoriesQuery()
  console.log('base_url', import.meta.env.VITE_BASE_URL,)
  return (
    <footer className="footer">
      <div 
        className={`container footer__container`}>      
            <div className="footer__categories">
              {
                categories?.categories.map(category => (
                  <Link 
                    to={`/category/${category}`} 
                    key={category}
                    className="btn sm white"
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
import { Link } from 'react-router-dom'
import logo from './../../assets/logo.png'
import './header.css'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
  const [bgOnScroll, setBgOnScroll] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { user} = useSelector((state: {auth: AuthState}) => state.auth)
  
  const dispatch = useDispatch()

  useEffect(() => {
    const changeBackground = () => {
        if(window.scrollY >= 80) {
            setBgOnScroll(true)
        }else{
            setBgOnScroll(false)
        }
    }
    window.addEventListener('scroll', changeBackground)

    return () => {
        window.removeEventListener('scroll', changeBackground)
    }
  }, [])  

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Sesión cerrada correctamente')
  }

  return (
    <nav className={`nav ${window.innerWidth > 768 ? (bgOnScroll ? 'active' : '') : 'primary'}`}>
        <div className="container nav__container">
            <Link to={'/'} className='nav__logo'>
                <img src={logo} alt='logo' />
            </Link>
            <div className={`nav__menu-wrapper ${isOpen ? 'active' : null}`}>
                <ul className='nav__menu'>
                    {
                        user?.name ? (
                            <>
                                <li>
                                    <Link to='/dashboard'>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to='/create'>Crear</Link>
                                </li>
                                <li>
                                    <Link to='/profile'>
                                        {user.name}
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/'
                                        onClick={handleLogout}
                                    >
                                        Cerrar Sesión
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={'/authors'}>
                                        Authores    
                                    </Link>
                                 </li>
                                <li>
                                    <Link to={'/login'}>
                                        Iniciar Sesión
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
            <div className="nav__mobile">
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className='nav__mobile-button'
                >
                    {
                        !isOpen ? <FaBars /> : <FaTimes />
                    }
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Header
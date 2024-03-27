import { Link } from 'react-router-dom'
import logo from './../../assets/logo.png'
import './header.css'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [bgOnScroll, setBgOnScroll] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
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

  const  stickyNav = (window.innerWidth > 768) && !bgOnScroll ? true : false
  console.log(window.innerWidth > 768, bgOnScroll)
  console.log(window.innerWidth, window.scrollY)
  console.log(stickyNav)

  return (
    <nav className={`nav ${window.innerWidth > 768 ? (bgOnScroll ? 'active' : '') : 'primary'}`}>
        <div className="container nav__container">
            <Link to={'/'} className='nav__logo'>
                <img src={logo} alt='logo' />
            </Link>
            <div className={`nav__menu-wrapper ${isOpen ? 'active' : null}`}>
                <ul className='nav__menu'>
                    <li>
                        <Link to={'/'}>
                            Authores    
                        </Link>
                    </li>
                    <li>
                        <Link to={'/login'}>
                            Iniciar Sesión
                        </Link>
                    </li>
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
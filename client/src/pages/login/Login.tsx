import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../store/slices/authSlice"
import { useLoginMutation } from "../../store/slices/usersApiSlice" 

import './login.css'
import { toast } from "react-toastify"

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginUser] = useLoginMutation()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }) )
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!userData.email || !userData.password){
      toast.error('Todos los campos son obligatorios')
      return    
    }else if(userData.password.length < 8){
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }
    try {
      const user = await loginUser({...userData}).unwrap()
      dispatch(login({
        token: user.token,
        user: {
          id: user.id,
          name: user.name,
          isAdmin: null
        }
      }))
      toast.success('Sesión iniciada correctamente')
      navigate('/') 
    } catch (error) {
      toast.error('Error al iniciar sesión')
    }
  }

  return (
  <section className="login">
    <div className="form__container">
      <h2>
        Iniciar Sesión
      </h2>
      <form className="form" onSubmit={handleLogin}>

        
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={userData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={userData.password}
          onChange={handleInputChange}
        />
        <button 
          type="submit"
          className="btn"
        >
          Iniciar Sesión
        </button>
      </form>
      <small>
        ¿Aún no tienes cuenta? <Link to='/register'>Register</Link>
      </small>
    </div>
  </section>
  )
}

export default Login
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../../store/slices/usersApiSlice"
import { toast } from "react-toastify"

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const [register] = useRegisterMutation()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!userData.username || !userData.email || !userData.password || !userData.confirmPassword){
      toast.error('Todos los campos son obligatorios')
      return
    }else if(userData.password !== userData.confirmPassword){
      toast.error('Las contraseñas no coinciden')
      return
    }else if(userData.password.length < 8){
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }else if(userData.username.length < 3){
      toast.error('El nombre de usuario debe tener al menos 3 caracteres')
      return
    }
    try {
      const data = {
        name: userData.username,
        email: userData.email,
        password: userData.password,
        password2: userData.confirmPassword
      }
      await register(data).unwrap()
      toast.success('Usuario registrado correctamente')
      navigate('/login')
    } catch (error) {
      toast.error('Error al registrar el usuario')
    }

  }

  return (
    <section className="register">
      <div className="form__container">
        <h2>
          Registrarse
        </h2>
        <form 
          className="form"
          onSubmit={handleRegister}
          autoComplete="off"
        >
        
          <input 
            autoComplete="false"
            name="hidden" 
            type="text" 
            style={{display: 'none'}} 
          />

          <input
            type="text"
            name="username"
            placeholder="Nombre de Usuario"
            value={userData.username}
            onChange={handleInputChange}
          />
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
            autoComplete="new-password"
            placeholder="Contraseña"
            value={userData.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirmar Contraseña"
            value={userData.confirmPassword}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn"
          >
            Registrarse
          </button>
        </form>
        <small>
          ¿Ya tienes cuenta? <Link to='/login'>Iniciar Sesión</Link>
        </small>
      </div>
    </section>
  )
}

export default Register
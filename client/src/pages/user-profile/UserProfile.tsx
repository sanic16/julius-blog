import { 
    useGetProfileQuery,
    useUpdateProfileMutation,
    useChangeAvatarMutation
} from "../../store/slices/usersApiSlice"
import Loader from "../../components/loader/Loader"
import { toast } from "react-toastify"
import classes from './UserProfile.module.css'
import { FaCheck, FaEdit } from "react-icons/fa"
import React, { useEffect, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { updateProfile as updateProfileState } from "../../store/slices/authSlice"

const UserProfile = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const {
    data: profile,
    isError,
    isLoading,
    refetch
  } = useGetProfileQuery()
  
  const dispatch = useDispatch()

  const [updateAvatar, { isLoading: updateLoading }] = useChangeAvatarMutation()

  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation()
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file){
      setAvatarFile(file[0])
      setAvatar(URL.createObjectURL(file[0]))
    }
  }

  const handleUpdateAvatar = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if(!avatarFile){
        toast.error('Por favor selecciona una imagen')
        return
      }
      const formData = new FormData()
      formData.append('avatar', avatarFile!)
      await updateAvatar(formData).unwrap()
      setAvatarFile(null)
      toast.success('Avatar actualizado')
      refetch()
    } catch (error) {
      toast.error('Error al actualizar el avatar') 
    }
  }

  const handleUpdateProfile = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!email || !currentPassword || !newPassword || !confirmNewPassword){
      toast.error('Por favor llena todos los campos')
      return
    }else if(newPassword !== confirmNewPassword){
      toast.error('Las contraseñas no coinciden')
      return
    }else if(newPassword.length < 6){
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }
    try {
      await updateProfile({
        name,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
      }).unwrap()
      dispatch(updateProfileState(name))
      setName('')
      setEmail('')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      toast.success('Perfil actualizado')
      refetch()
    } catch (error) { 
      toast.error('Error al actualizar el perfil')
    }
  }
  

  useEffect(() => {
    if(profile){
      setName(profile.name)
      setEmail(profile.email)
      setAvatar(profile.avatar)
    }
  }, [profile])

  return (
    <section className={classes.profile}>
      {
          isLoading ? (
            <Loader />
          ) : (isError || !profile) ? (
            <h1>
              Error al cargar el perfil
            </h1>
          ): (
            <div className={classes.profile__info}>
              
              <div className={classes.avatar__info}>
                <label
                  htmlFor="avatar"
                >
                  <div className={classes.avatar}>
                    <img src={avatar} alt={profile?.name} />
                </div>
                </label>
                <form 
                  className={classes.avatar__form}
                  onSubmit={handleUpdateAvatar}
                >
                  <input 
                    id="avatar"
                    type="file"
                    onChange={handleAvatarChange} 
                  />
                  <label htmlFor="avatar">
                    <FaEdit />
                  </label>
                  {
                  avatarFile && (
                    <button
                      type="submit"
                      className={`${classes.avatar__btn} ${updateLoading ? classes.disabled : ''}`}
                    >
                      {updateLoading ? <BsThreeDots /> : <FaCheck />}
                </button>
                  )
                }
                </form>
              </div>
              
                <h1
                  className={classes.avatar__name}
                >
                  {name}
                </h1>

                <form
                  className={classes.form}
                  onSubmit={handleUpdateProfile}
                >
                  <input
                    type="text"
                    value={name}
                    placeholder="Nombre de usuario"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input 
                    type="text"
                    value={email}
                    placeholder="Correo electrónico"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input 
                    type="password"
                    autoComplete="new-password"
                    value={currentPassword}
                    placeholder="Contraseña"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <button
                    className={`btn primary ${updateProfileLoading ? 'disabled' : ''}`}
                  >
                    {
                      updateProfileLoading ? 'Actualizando...' : 'Actualizar'
                    }
                  </button>

                </form>
            </div>
          )
      }
    </section>
  )
}

export default UserProfile
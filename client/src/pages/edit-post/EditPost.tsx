import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useUpdatePostMutation } from '../../store/slices/postsApiSlice'
import { formats, modules } from '../../utils/quill-formats'
import { toast } from 'react-toastify'
import { useGetPostQuery } from '../../store/slices/postsApiSlice'

import classes from './EditPost.module.css'
import Loader from '../../components/loader/Loader'


const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const { id } = useParams<{id: string}>()

  const { data, isLoading: loadingPost, isError } = useGetPostQuery(id!)

  const [updatePost, { isLoading }] = useUpdatePostMutation()

  const { categories } = useSelector((state: {cat: {categories: []}}) => state.cat )


  const { user } = useSelector((state: {auth: AuthState}) => state.auth)

  const navigate = useNavigate()

  

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file){
      setThumbnail(file[0])
    }
  }

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!title || !category || !description || !thumbnail){
      toast.error('Por favor llena todos los campos')
      return
    }else if(description.length < 50){
      toast.error('La descripción debe tener al menos 50 caracteres')
      return
    }else if(title.length < 5){
      toast.error('El titulo debe tener al menos 5 caracteres')
      return
    }else if(thumbnail.size > 5 * 1024 * 1024){
      toast.error('La imagen debe ser menor a 5MB')
      return
    }
    try {
      const post = new FormData()
      post.append('title', title)
      post.append('category', category)
      post.append('description', description)
      post.append('thumbnail', thumbnail)
      await updatePost({
        id: id!,
        body: post
      }).unwrap()
      toast.success('Post actualizado exitosamente')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Algo salio mal, intenta de nuevo')
    }
  }

  useEffect(() => {
    if (data) {
      setTitle(data.post.title);
      setCategory(data.post.category);
      setDescription(data.post.description);
      console.log(data.post.thumbnail)
    }
      
  }, [data,]);
  

  return (
    <section className={classes.edit__post}>
    {
      loadingPost ? (
        <Loader />
      ) : isError || !data? (
        <h1>
          Error al cargar la publicación
        </h1>
      ) : (
        <>
          {
            user?.id === data.post.creator ? (
              <div className={classes['edit__post-container']}>
          <h1>
            Editar Post
          </h1>
          <form 
            className={classes.form}
            onSubmit={handleCreatePost}
          >
            <input 
              type='text'
              placeholder='Titulo'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />

            <select 
              value={category}
              onChange={(e => setCategory(e.target.value))}
            >
              {
                categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              }
            </select>

            <ReactQuill
              modules={modules}
              formats={formats}
              value={description}
              onChange={setDescription}
              placeholder='Escribe algo increible...'
              className={classes.quill__editor}
            />  

            <div className={classes.file}>
              <input
                type='file'
                onChange={handleThumbnail}
                accept='image/*'
              />
              <div className={classes.thumbnail}>
                {
                  thumbnail && <img src={URL.createObjectURL(thumbnail)} alt='thubmanil' />
                }
              </div>
            </div>
            {
              !isLoading ? (
                <button
                  type='submit'
                  className='btn primary'
                >
                  Editar Post
                </button>
              ):(
                <button
                  type='submit'
                  className='btn primary'
                  disabled
                >
                  Editando...
                </button>
              )

            }
          </form>
      </div>
            ): (
              <Navigate to='/dashboard' replace />
            )
          }
        </>
      )
    }
    </section>

   
      
  )
}

export default EditPost
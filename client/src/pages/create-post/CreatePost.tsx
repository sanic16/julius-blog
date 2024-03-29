import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import classes from './CratePost.module.css'
import { useCreatePostMutation } from '../../store/slices/postsApiSlice'
import { formats, modules } from '../../utils/quill-formats'
import { toast } from 'react-toastify'


const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const [createPost, { isLoading }] = useCreatePostMutation()

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file){
      setThumbnail(file[0])
    }
  }

  const { categories } = useSelector((state: {cat: {categories: []}}) => state.cat )
  const navigate = useNavigate()

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
      await createPost(post).unwrap()
      toast.success('Post creado exitosamente')
      navigate('/')
    } catch (error) {
      toast.error('Algo salio mal, intenta de nuevo')
    }
  }

  return (
    <section className={classes.create__post}>
      <div className={classes['create__post-container']}>
        <h1>
          Crear Post
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
                Crear Post
              </button>
            ):(
              <button
                type='submit'
                className='btn primary'
                disabled
              >
                Creando Post...
              </button>
            )

          }
        </form>
      </div>
    </section>
  )
}

export default CreatePost
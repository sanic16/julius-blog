import { useGetAuthorQuery } from "../../store/slices/usersApiSlice"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/loader/Loader"
import classes from './UserProfile.module.css'


const UserProfile = () => {
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile
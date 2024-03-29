import { Outlet } from "react-router-dom"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
  return (
    <>       
        <Header /> 
            <main>
              <Outlet />  
            </main>
        <Footer />
        <ToastContainer 
          autoClose={2000}
        />
    </>
  )
}

export default Layout
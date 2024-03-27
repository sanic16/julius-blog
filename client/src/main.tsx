import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout.tsx'
import PrivateRoot from './components/private-root/PrivateRoot.tsx'
import ErrorPage from './pages/error-page/ErrorPage.tsx'
import Home from './pages/home/Home.tsx'
import PostDetail from './pages/post-detail/PostDetail.tsx'
import Register from './pages/register/Register.tsx'
import Login from './pages/login/Login.tsx'
import UserProfile from './pages/user-profile/UserProfile.tsx'
import Authors from './pages/authors/Authors.tsx'
import EditPost from './pages/edit-post/EditPost.tsx'
import CreatePost from './pages/create-post/CreatePost.tsx'
import AuthorPosts from './pages/author-posts/AuthorPosts.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import CategoryPosts from './pages/category-posts/CategoryPosts.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [      
        {index: true, element: <Home />},
        {path: 'login', element: <Login />},
        {path: 'register', element: <Register />},
        {path: 'post/:id', element: <PostDetail />},
        {path: 'authors', element: <Authors />},
        {path: 'myposts', element: <Dashboard />},
        {path: 'posts/categories/:category', element: <CategoryPosts />},
        {path: 'posts/authors/:author', element: <AuthorPosts />},

        // private routes-
        {path: '/', element: <PrivateRoot />, children: [
            {path: 'user-profile', element: <UserProfile />},
            {path: 'posts/:id/edit', element: <EditPost />},
            {path: 'create', element: <CreatePost />},
        ]},    
    ],  
  }
])



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

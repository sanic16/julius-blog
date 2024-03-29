/// <reference types="vite/client" />
type AuthUser = {
    id: string
    name: string
    isAdmin?: boolean | null
}

type AuthState = {
    user: AuthUser | null
    token: string | null
}

type Post = {
    _id: string
    title: string
    category: string
    description: string
    creator: string
    thumbnail: string
    createdAt: string
}

type Posts = {
    posts: Post[]
}

type Author = {
    _id: string
    name: string
    email: string
    avatar: string 
    posts: number
    createdAt: string
}

type RegisterUser = {
    name: string
    email: string
    password: string
    password2: string
}

type LoggedUser = {
    id: string
    name: string
    token: string
}

type Profile = {
    name: string
    email: string
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}
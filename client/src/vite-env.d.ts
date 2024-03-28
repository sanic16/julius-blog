/// <reference types="vite/client" />
type AuthUser = {
    id: string
    name: string
    isAdmin?: boolean 
}

type AuthState = {
    auth: AuthUser | null
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
}
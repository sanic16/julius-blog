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
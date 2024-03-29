import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers) => {
            const user: AuthState = JSON.parse(localStorage.getItem('auth') as string)
            if(user && user.token){
                headers.set('authorization', `Bearer ${user.token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Posts', 'CategoryPosts', 'AuthorPosts', 'Authors', 'Profile'],
    endpoints: () => ({})
})

export default api
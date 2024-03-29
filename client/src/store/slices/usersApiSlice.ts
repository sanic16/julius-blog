import api from "./apiSlice";

const usersApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<string, RegisterUser>({
            query: (body) => ({
                url: '/users/register',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Authors']
        }),
        login: builder.mutation<LoggedUser, {email: string, password: string}>({
            query: (body) => ({
                url: '/users/login',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Authors', 'Profile']
        }),
        getAuthor: builder.query<Author, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET'
            })
        }),
        getAuthors: builder.query<Author[], void>({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
            providesTags: ['Authors']
        }),
        getProfile: builder.query<Author, void>({
            query: () => ({
                url: '/users/profile',
                method: 'GET'
            }),
            providesTags: ['Profile']
        }),
        updateProfile: builder.mutation<Author, Profile>({
            query: (body) =>({
                url: '/users/edit-user',
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Authors', 'Profile']
        }),
        changeAvatar: builder.mutation<string, FormData>({
            query: (body) => ({
                url: '/users/change-avatar',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Authors', 'Profile']
        })
    })
})

export const {
    useGetAuthorQuery,
    useRegisterMutation,
    useLoginMutation,
    useGetAuthorsQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useChangeAvatarMutation
} = usersApiSlice
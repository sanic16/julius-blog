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
    })
})

export const {
    useGetAuthorQuery,
    useRegisterMutation,
    useLoginMutation
} = usersApiSlice
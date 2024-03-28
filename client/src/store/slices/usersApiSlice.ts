import api from "./apiSlice";

const usersApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAuthor: builder.query<Author, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET'
            })
        })
    })
})

export const {
    useGetAuthorQuery
} = usersApiSlice
import api from "./apiSlice";

const postsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<{categories: string[]}, void>({
            query: () => ({
                url: '/posts/categories',
                method: 'GET'
            })
        }),
        getPosts: builder.query<Posts, void>({
            query: () => ({
                url: '/posts',
                method: 'GET'
            }),
            providesTags: ['Posts']
        }),
        getPostsByCategory: builder.query<Posts, string>({
            query: (category) => ({
                url: `/posts/categories/${category}`,
                method: 'GET'
            }),
            providesTags: ['CategoryPosts']
        }),
        getPostsByAuthor: builder.query<Posts, string>({
            query: (author) => ({
                url: `/posts/users/${author}`,
                method: 'GET'
            }),
            providesTags: ['AuthorPosts']
        }),
        createPost: builder.mutation<string, FormData>({
            query: (body) => ({
                url: '/posts',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Posts', 'CategoryPosts', 'AuthorPosts']
        }),
        getPost: builder.query<{post: Post}, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            })
        }),
        updatePost: builder.mutation<string, {id: string, body: FormData}>({
            query: ({id, body}) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: ['Posts', 'CategoryPosts', 'AuthorPosts']
        }),
        deletePost: builder.mutation<{message: string}, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Posts', 'CategoryPosts', 'AuthorPosts']
        })

    })
})

export const {
    useGetCategoriesQuery,
    useGetPostsQuery,
    useGetPostsByCategoryQuery,
    useGetPostsByAuthorQuery,
    useCreatePostMutation,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation
} = postsApiSlice
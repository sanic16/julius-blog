import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = localStorage.getItem('auth') ? 
JSON.parse(localStorage.getItem('auth') as string) : {
    auth: null,
    token: null
}
 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: {payload: {
            user: AuthUser,
            token: string
        
        }}) => {
            state.auth = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('auth', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.auth = null
            state.token = null
            localStorage.removeItem('auth')
        }  
    }
})

export default authSlice.reducer
export const {
    login
} = authSlice.actions
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = localStorage.getItem('auth') ? 
JSON.parse(localStorage.getItem('auth') as string) : {
    user: null,
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
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('auth', JSON.stringify(state))
        },
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('auth')
        },
        updateProfile: (state, action: {payload: string}) => {
            state.user!.name = action.payload
            localStorage.setItem('auth', JSON.stringify(state))
        }
    }
})

export default authSlice.reducer
export const {
    login,
    logout,
    updateProfile
} = authSlice.actions
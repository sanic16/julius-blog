import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import api from "./slices/apiSlice";

const store = configureStore({
    reducer: {        
        [api.reducerPath]: api.reducer,
        auth: authReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true
})

export default store
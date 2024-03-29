import { createSlice } from "@reduxjs/toolkit";

const initialState: {categories: string[]} = {
    categories: [] 
}

const catSlice = createSlice({
    name: 'cat',
    initialState,
    reducers: {
        setCategories: (state, action: {payload: {cat: string[]}}) => {
            state.categories = action.payload.cat
        }
    }
})

export default catSlice.reducer
export const {
    setCategories
} = catSlice.actions
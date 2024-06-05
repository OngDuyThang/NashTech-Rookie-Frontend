import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TCartState = {
    count: number | undefined
}

const initialState: TCartState = {
    count: undefined
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserCartCount(state, action: PayloadAction<number>) {
            state.count = action.payload
        }
    }
})

export const {
    setUserCartCount
} = cartSlice.actions
export default cartSlice.reducer
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
        setUserCartCount(_state, action: PayloadAction<number>) {
            return {
                count: action.payload
            }
        }
    }
})

export const {
    setUserCartCount
} = cartSlice.actions
export default cartSlice.reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AUTH, TTokenResponse } from "types/auth";

export type TUserState = TTokenResponse & {
    isSession: boolean
}

const initialState: TUserState = {
    [AUTH.ACCESS_TOKEN]: '',
    username: '',
    email: '',
    picture: '',
    isSession: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAction(
            _state,
            action: PayloadAction<TTokenResponse>
        ) {
            return { ...action.payload, isSession: true }
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state[AUTH.ACCESS_TOKEN] = action.payload
        }
    }
})

export const {
    loginAction,
    setAccessToken
} = userSlice.actions
export default userSlice.reducer
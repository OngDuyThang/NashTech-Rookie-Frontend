import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AUTH, TTokenResponse } from "types/auth";
import { jwtDecode } from "jwt-decode";

export type TUserState = TTokenResponse & {
    username: string,
    email: string,
    picture: string
}

const initialState: TUserState & { isSession: boolean } = {
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
            const token = action.payload?.[AUTH.ACCESS_TOKEN]
            if (!token) return

            const payload = jwtDecode<TUserState>(token)
            return {
                access_token: token,
                username: payload?.username,
                email: payload?.email,
                picture: payload?.picture,
                isSession: true,
            }
        },
        logoutAction() {
            return initialState
        },
        setAccessToken(state, action: PayloadAction<string>) {
            state[AUTH.ACCESS_TOKEN] = action.payload
        }
    }
})

export const {
    loginAction,
    logoutAction,
    setAccessToken
} = userSlice.actions
export default userSlice.reducer
import { axiosClient } from "./axios"

export const logout = async () => {
    await axiosClient.post('/auth/logout')
}
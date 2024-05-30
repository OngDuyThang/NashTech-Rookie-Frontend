import { API_HOST, API_METHOD } from "utils/constant"
import { axiosClient } from "./axios"

export const logout = async () => {
    const url = `${API_METHOD}://${API_HOST}:3000/auth/logout`
    await axiosClient.post(url)
}
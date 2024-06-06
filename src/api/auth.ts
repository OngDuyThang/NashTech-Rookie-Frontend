import { API_AUTH_PORT, API_HOST } from "utils/constant"
import { axiosClient } from "./axios"
import { getUrlEndpoint } from "utils/helper"

export const logout = async () => {
    const url = getUrlEndpoint(
        API_HOST,
        API_AUTH_PORT,
        '/auth/logout'
    )
    await axiosClient.post(url)
}
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { TApiResponse } from "types/api";
import { AUTH } from "types/auth";
import { API_AUTH_PORT, API_HOST, API_METHOD } from "utils/constant";
import { getAccessToken, autoLogout, replaceAccessToken, isSession, getUrlEndpoint } from "utils/helper";

// axios instance for client
export const axiosClient = axios.create({
    withCredentials: true
});

axiosClient.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
        const accessToken = getAccessToken()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config;
    },
    function (e: AxiosError) {
        console.log(e)
    }
)

axiosClient.interceptors.response.use(
    function (res: AxiosResponse<TApiResponse>) {
        return res
    },
    async function (e: AxiosError<TApiResponse>) {
        const {
            response,
            request: { responseURL: url },
            config: originalConfig
        } = e

        if (response) {
            const { data: { message, statusCode } } = response

            const accessToken = getAccessToken()
            if (statusCode == 401 && !url.includes('refresh') && isSession() && accessToken) {
                const payload = jwtDecode(accessToken)

                if (accessToken && payload && Date.now() >= Number(payload?.exp) * 1000) {
                    const url = getUrlEndpoint(
                        API_HOST,
                        API_AUTH_PORT,
                        '/auth/refresh'
                    )
                    const res = await axiosClient.post(url, {
                        [AUTH.ACCESS_TOKEN]: accessToken
                    })

                    if (res) {
                        const { data: { data } } = res
                        replaceAccessToken(data?.[AUTH.ACCESS_TOKEN])
                        return axiosClient(originalConfig as AxiosRequestConfig)
                    }
                }
            }

            if (statusCode == 401 && url.includes('refresh')) {
                if (!isSession()) return

                autoLogout()
                return
            }

            return {
                data: {
                    data: null,
                    message,
                    statusCode
                }
            }
        }
        return {
            data: {
                data: null,
                message: 'Internal Server Error',
                statusCode: 500
            }
        }
    },
);
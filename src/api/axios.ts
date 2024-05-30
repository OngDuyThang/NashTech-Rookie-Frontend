import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { TApiResponse } from "types/api";
import { AUTH } from "types/auth";
import { API_HOST, API_METHOD } from "utils/constant";
import { getAccessToken, autoLogout, replaceAccessToken, isSession } from "utils/helper";

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

            if (statusCode === 401 && !url.includes('refresh')) {
                if (!isSession()) return

                const url = `${API_METHOD}://${API_HOST}:3000/auth/refresh`
                const res = await axiosClient.post(url, {
                    [AUTH.ACCESS_TOKEN]: getAccessToken()
                })

                if (res) {
                    const { data: { data } } = res
                    replaceAccessToken(data?.[AUTH.ACCESS_TOKEN])
                    return axiosClient(originalConfig as AxiosRequestConfig)
                }
            }

            if (statusCode === 401 && url.includes('refresh')) {
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
import { axiosClient } from 'api/axios'
import { LoadingScreen } from 'components'
import { useAppDispatch } from 'hooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { loginAction } from 'store/user/slice'
import { API_AUTH_PORT, API_HOST, API_METHOD } from 'utils/constant'
import { getUrlEndpoint } from 'utils/helper'

const Callback = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            const url = getUrlEndpoint(
                API_HOST,
                API_AUTH_PORT,
                '/auth/token'
            )
            const { data } = await axiosClient.post(url, {
                authCode: router.query?.code
            })
            dispatch(loginAction(data?.data))

            router.replace({
                pathname: '/'
            })
        })()
    }, [])

    return <LoadingScreen />
}

export default Callback

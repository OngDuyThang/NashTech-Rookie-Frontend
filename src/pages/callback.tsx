import { axiosClient } from 'api/axios'
import { LoadingScreen } from 'components'
import { useAppDispatch } from 'hooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { loginAction } from 'store/user/slice'
import { API_HOST, API_METHOD } from 'utils/constant'

const Callback = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async () => {
            const url = `${API_METHOD}://${API_HOST}:3000/auth/token`
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

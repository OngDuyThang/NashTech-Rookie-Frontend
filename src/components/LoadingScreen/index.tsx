import clsx from 'clsx'
import { Container, Spin } from 'components'
import { includes, some } from 'lodash'
import { useRouter } from 'next/router'
import { useState, type FC, useEffect } from 'react'

interface IProps {
    isRouteLoading?: boolean
}

const LoadingScreen: FC<IProps> = ({
    isRouteLoading = false
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    const LoadingUI = (
        <Container
            className='w-screen h-screen absolute z-[999] top-0 left-0'
            background='#fff'
            flex
            justify='center'
            align='center'
            style={
                some(Object.keys(router.query), item => includes(['page', 'limit', 'sort', 'rating'], item))
                    ? { display: 'none' } : undefined
            }
        >
            <Spin size='large' />
        </Container>
    )

    if (isRouteLoading) {
        return isLoading ? LoadingUI : null
    }

    return LoadingUI
}

export default LoadingScreen

import {
    ConfigProvider as AntdConfigProvider,
    Layout as AntdLayout,
    notification
} from 'antd'
import { NotificationInstance } from 'antd/es/notification/interface';
import { type FC, type ReactNode, useEffect, createContext, lazy, Suspense } from "react"
import { useAppDispatch } from 'hooks';
import styles from './index.module.scss'
import { setAccessToken } from 'store/user/slice';
import { getAccessToken } from 'utils/helper';
import { LoadingScreen } from 'components';
import { useRouter } from 'next/router';
const Header = lazy(() => import('./Header'))
const Content = lazy(() => import('./Content'))
const Footer = lazy(() => import('./Footer'))

export interface ToastInstance extends NotificationInstance {}
export const ToastContext = createContext<ToastInstance | null>(null)

export const {
    Header: AntdHeader,
    Content: AntdContent,
    Footer: AntdFooter
} = AntdLayout

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({
    children
}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [api, contextHolder] = notification.useNotification();

    const storageEvent = () => {
        const accessToken = getAccessToken()
        dispatch(setAccessToken(accessToken))
    }

    useEffect(() => {
        window.addEventListener('storage', storageEvent)
        return () => {
            window.removeEventListener('storage', storageEvent)
        }
    }, [])

    if (router.pathname === '/404') return <>{children}</>

    return (
        <AntdConfigProvider>
            {contextHolder}
            <LoadingScreen isRouteLoading />
            <AntdLayout className={styles.root}>
                <ToastContext.Provider value={api}>
                    <Suspense fallback={<LoadingScreen />}>
                        <Header />
                        <Content className='px-8'>
                            {children}
                        </Content>
                        <Footer />
                    </Suspense>
                </ToastContext.Provider>
            </AntdLayout>
        </AntdConfigProvider>
    )
}

export default Layout

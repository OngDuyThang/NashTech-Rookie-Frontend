import { useContext, useEffect, useState, type FC } from "react"
import styles from './index.module.scss'
import { User, OpenSider } from "layout/Components"
import { Image, Div, Container, Drawer, Button } from "components"
import clsx from "clsx"
import { AntdHeader, ToastContext, ToastInstance } from "layout"
import { useAppDispatch, useAppSelector } from "hooks"
import { useRouter } from "next/router"
import Link from "next/link"
import { API_HOST, API_METHOD, SERVICE } from "utils/constant"
import { ApolloClient, InMemoryCache, useLazyQuery, useQuery } from "@apollo/client"
import { GET_USER_CART_COUNT } from "graphql/cart"
import { setUserCartCount } from "store/cart/slice"

const navLinks = [
    {
        title: 'Home',
        pathname: '/home'
    },
    {
        title: 'Shop',
        pathname: '/shop'
    },
    {
        title: 'About',
        pathname: '/about'
    }
]

interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = ({
    className
}) => {
    const toast = useContext(ToastContext) as ToastInstance
    const dispatch = useAppDispatch()
    const { isSession } = useAppSelector(state => state.user)
    const { count } = useAppSelector(state => state.cart)
    const router = useRouter()

    const [getUserCartCount] = useLazyQuery(GET_USER_CART_COUNT)
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if (count == undefined && isSession) {
            (async () => {
                const { data, error } = await getUserCartCount({ context: { service: SERVICE.CART } })
                if (data?.getUserCartCount) {
                    dispatch(setUserCartCount(data?.getUserCartCount))
                }
                if (error) toast.error({ message: error?.graphQLErrors[0]?.message })
            })()
        }
    }, [])

    const Links = navLinks.map((link, index) =>
        <Link
            key={index}
            href={{ pathname: link.pathname }}>
            {link.title}
        </Link>
    )

    const Left = (
        <Container width="50" height="100" flex align="center" gap='16'
            className={styles.left}>
            <Div
                className={styles.logo}
                onClick={() => router.push({ pathname: '/' })}
            >
                <Image
                    src={'/images/bookworm-logo.png'}
                    alt='logo'
                />
            </Div>
            <OpenSider onClick={() => setOpen(true)} />
        </Container>
    )

    const Right = (
        <Container width="50" height="100" flex direct="row" gap='16' align="center" justify="end"
            className={styles.right}>
            {Links}
            <Link href={{ pathname: '/cart' }}>Cart ({count})</Link>
            {isSession ? <User /> :
                <a href={`${API_METHOD}://${API_HOST}:3000/auth/login`}>
                    <Button>Login</Button>
                </a>
            }
        </Container>
    )

    const Sider = (
        <Drawer
            className={styles['sider-menu']}
            open={open}
            onClose={() => setOpen(false)}>
            <Container height="100" flex direct="column" align="start" gap='16'>
                Collapse here
            </Container>
        </Drawer>
    )

    return (
        <AntdHeader className={styles.header}>
            <Container className={clsx(styles.root, className)} flex gap='16'>
                {Left}
                {Right}
                {Sider}
            </Container>
        </AntdHeader>
    )
}

export default Header
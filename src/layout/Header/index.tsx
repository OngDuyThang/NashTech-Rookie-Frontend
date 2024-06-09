import { useContext, useEffect, useState, type FC } from "react"
import styles from './index.module.scss'
import { User, OpenSider } from "layout/Components"
import { Image, Div, Container, Drawer, Button, Text } from "components"
import clsx from "clsx"
import { AntdHeader, ToastContext, ToastInstance } from "layout"
import { useAppDispatch, useAppSelector } from "hooks"
import { useRouter } from "next/router"
import Link from "next/link"
import { API_AUTH_PORT, API_HOST, COLOR, SERVICE } from "utils/constant"
import { useLazyQuery } from "@apollo/client"
import { GET_USER_CART_COUNT } from "graphql/cart"
import { setUserCartCount } from "store/cart/slice"
import { getUrlEndpoint } from "utils/helper"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        (async () => {
            const { data } = await getUserCartCount({ context: { service: SERVICE.CART } })
            if (data?.getUserCartCount) {
                dispatch(setUserCartCount(data?.getUserCartCount))
            }
        })()
    }, [])

    const Links = navLinks.map((link, index) =>
        <Link
            key={index}
            href={{ pathname: link.pathname }}>
            <span className={styles.link}>{link.title}</span>
        </Link>
    )

    const Left = (
        <Container width="20" height="100" flex align="center"
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
            {/* <OpenSider onClick={() => setOpen(true)} /> */}
            <Text fontSize="1.25rem" fontWeight={500} color="#fff">The<br /> Bookworm</Text>
        </Container>
    )

    const Center = (
        <Container width="60" height="100" flex direct="row" gap='32' align="center" justify="center"
            className={styles.right}>
            {Links}
            <Link href={{ pathname: '/cart' }}><span className={styles.link}>Cart ({count})</span></Link>
        </Container>
    )

    const Right = (
        <Container width="20" height="100" flex direct="row" gap='16' align="center" justify="end"
            className={styles.right}>
            {isSession ? <User /> :
                <a href={getUrlEndpoint(
                    API_HOST,
                    API_AUTH_PORT,
                    '/auth/login'
                )}>
                    <Button bgColor='#fff' fontWeight={600} type="default"><Text color={COLOR.BLACK_TEXT}>Login</Text></Button>
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
                {Center}
                {Right}
                {Sider}
            </Container>
        </AntdHeader>
    )
}

export default Header
import { useContext, useEffect, useState, type FC } from "react"
import styles from './index.module.scss'
import { User, OpenSider } from "layout/Components"
import { Image, Div, Container, Drawer, Button, Text } from "components"
import clsx from "clsx"
import { AntdHeader, ToastContext, ToastInstance } from "layout"
import { useAppDispatch, useAppSelector } from "hooks"
import { useRouter } from "next/router"
import Link from "next/link"
import { API_AUTH_PORT, API_HOST, SERVICE } from "utils/constant"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_USER_CART_COUNT } from "graphql/cart"
import { setUserCartCount } from "store/cart/slice"
import { getUrlEndpoint } from "utils/helper"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GET_ALL_PROMOTIONS } from "graphql/promotion/query"
import { PromotionEntity } from "__generated__/graphql"
import { isEmpty } from "lodash"

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
    const { data: dataPromotions } = useQuery(GET_ALL_PROMOTIONS)
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
            <Link href={{ pathname: '/cart' }}><span className={styles.link}>Cart ({count})</span></Link>
            {isSession ? <User /> :
                <a href={getUrlEndpoint(
                    API_HOST,
                    API_AUTH_PORT,
                    '/auth/login'
                )}>
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

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 10000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }

    const Promotions = !isEmpty(dataPromotions?.promotions) ? (
        <Slider {...settings}>
            {(dataPromotions?.promotions as PromotionEntity[])?.map((promotion, index) => (
                <Container key={index} color="#fff" className={styles.promotion}>
                    <Text tag="p" className="w-full text-center" fontSize="1rem">{promotion.name}</Text>
                    <Text tag="p" className="w-full text-center" fontSize="0.75rem">{promotion.description}</Text>
                </Container>
            ))}
        </Slider>
    ) : null

    return (
        <AntdHeader className={styles.header}>
            {Promotions}
            <Container className={clsx(styles.root, className)} flex gap='16'>
                {Left}
                {Right}
                {Sider}
            </Container>
        </AntdHeader>
    )
}

export default Header
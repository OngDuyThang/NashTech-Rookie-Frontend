import { useState, type FC } from "react"
import styles from './index.module.scss'
import { User, OpenSider } from "layout/Components"
import { Image, Div, Container, Drawer, Button } from "components"
import clsx from "clsx"
import { AntdHeader } from "layout"
import { useAppSelector } from "hooks"
import { useRouter } from "next/router"
import Link from "next/link"
import { PAGINATION, PRODUCT_SORT } from "utils/constant"
import { TQueryState } from "types/query"

const navLinks: { title: string, url: any }[] = [
    {
        title: 'Home',
        url: { pathname: '/home' }
    },
    {
        title: 'Shop',
        url: {
            pathname: '/shop', query: {
                page: PAGINATION.DEFAULT_PAGE,
                limit: PAGINATION.DEFAULT_LIMIT,
                sort: PRODUCT_SORT.ON_SALE
            } as TQueryState
        }
    },
    {
        title: 'About',
        url: { pathname: '/about' }
    },
    {
        title: 'Cart',
        url: { pathname: '/cart' }
    },
]

interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = ({
    className
}) => {
    const { isSession } = useAppSelector(state => state.user)
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)

    const Links = navLinks.map((link, index) =>
        <Link
            key={index}
            href={{
                pathname: link.url.pathname,
                query: link.url?.query
            }}>{link.title}
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
            {isSession ? <User /> :
                <a href='https://www.google.com'>
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
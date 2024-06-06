import { Container, Text } from "components"
import { capitalize } from "lodash"
import Link from "next/link"
import { FC } from "react"

const NotFound: FC = () => {
    return (
        <Container
            flex direct="column" gap={16} align="center" justify="center"
            className="w-screen h-screen"
        >
            <Text tag="span" fontSize="48px" fontWeight={600}>
                404
            </Text>
            <Text tag="span" fontSize="28px">
                {capitalize('not found')}
            </Text>
            <Link href={{
                pathname: '/'
            }}>
                <Text
                    tag="span" fontSize="18px" textDecoration="underline"
                    className="cursor-pointer"
                >
                    {capitalize('back to home page')}
                </Text>
            </Link>
        </Container>
    )
}

export default NotFound

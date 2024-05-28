import { Container, Text } from 'components'
import { ReactNode, type FC } from 'react'

interface TitleProps {
    children: ReactNode
}

const Title: FC<TitleProps> = ({
    children
}) => {
    return (
        <Container flex justify='start' align='center' className='py-6' style={{
            width: 'calc(100% - 32px)',
            margin: 'auto',
            borderBottom: '1px solid #ccc'
        }}>
            <Text fontSize='1.25rem' fontWeight={500}>{children}</Text>
        </Container>
    )
}

export default Title

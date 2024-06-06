import { Container, Text } from 'components'
import { ReactNode, type FC } from 'react'
import { COLOR } from 'utils/constant'

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
            borderBottom: `2px solid ${COLOR.PASTEL_BLUE}`
        }}>
            <Text fontSize='1.5rem' fontWeight={500}>{children}</Text>
        </Container>
    )
}

export default Title

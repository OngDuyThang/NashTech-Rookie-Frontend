import { Container, Div, Image, Text } from 'components'
import { type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx'

const Product: FC = () => {
    return (
        <Container flex direct='column' justify='center' align='start' className={styles.root}>
            <Div className={styles.image}>
                <Image
                    src=''
                    alt='product image'
                />
            </Div>
            <Div className='w-full p-4' >
                <Text fontSize='1.25rem' fontWeight={500}>Title</Text>
                <Text fontSize='0.85rem'>Author</Text>
            </Div>
            <Div className={clsx('w-full flex gap-2 p-4', styles.price)}>
                <Text className={styles.slash}>Org Price</Text>
                <Text className={styles.orgininal}>New Price</Text>
            </Div>
        </Container>
    )
}

export default Product

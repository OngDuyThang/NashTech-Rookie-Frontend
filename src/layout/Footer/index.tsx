import { AntdFooter } from 'layout'
import { CSSProperties, ReactNode, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx';
import { capitalize } from 'lodash';
import { Text } from 'components';

interface FooterProps {
    className?: string;
    style?: CSSProperties
}

const Footer: FC<FooterProps> = ({
    className,
    style
}) => {
    return (
        <AntdFooter
            {...{ className: clsx(styles.root, className), style }}
        >
            <Text fontSize='1.2rem' fontWeight={500}>
                {capitalize('bookworm')}
            </Text>
            <Text fontSize='1.15rem'>
                {capitalize('address')}:
                Ho Chi Minh City
            </Text>
            <Text fontSize='1.15rem'>
                {capitalize('phone')}:
                +84 123 456 789
            </Text>
        </AntdFooter>
    )
}

export default Footer

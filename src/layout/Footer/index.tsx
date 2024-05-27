import { AntdFooter } from 'layout'
import { CSSProperties, ReactNode, type FC } from 'react'
import styles from './index.module.scss'
import clsx from 'clsx';

interface FooterProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties
}

const Footer: FC<FooterProps> = ({
    children,
    className,
    style
}) => {
    return (
        <AntdFooter
            className={clsx(styles.root)}
        >
            {children}
        </AntdFooter>
    )
}

export default Footer

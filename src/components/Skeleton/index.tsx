import clsx from 'clsx'
import { type FC } from 'react'
import styles from './index.module.scss'
import {Div} from 'components'

type SkeletonType = 'title' | 'text' | 'avatar' | 'thumbnail'

interface IProps {
    type: SkeletonType
    className?: string
}

const Skeleton: FC<IProps> = ({
    type,
    className
}) => {
    return (
        <Div className={clsx(
            styles.skeleton,
            styles[type],
            className
        )}>{null}</Div>
    )
}

export default Skeleton

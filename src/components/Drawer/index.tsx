import { CSSProperties, type FC } from 'react'
import {
    Drawer as AntdDrawer,
    DrawerProps as AntdDrawerProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { TDrawerProps } from 'types/drawer'
import { IoClose } from 'react-icons/io5'
import { Require } from 'types/common'

interface DrawerProps extends 
Require<AntdDrawerProps, TDrawerProps> {
    className?: string,
    style?: CSSProperties
}

const Drawer: FC<DrawerProps> = ({
    children,
    open,
    onClose,
    className,
    style,
    ...props
}) => {
    return (
        <AntdConfigProvider>
            <AntdDrawer
                open={open}
                onClose={onClose}
                placement={'left'}
                closeIcon={<IoClose  className='w-6 h-6' />}
                {...{className, style}}
                {...props}
            >
                {children}
            </AntdDrawer>
        </AntdConfigProvider>
    )
}

export default Drawer

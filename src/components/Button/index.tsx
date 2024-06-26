import { type FC } from 'react'
import {
    Button as AntdButton,
    ButtonProps as AntdButtonProps,
    ConfigProvider as AntdConfigProvider,
} from 'antd'
import { TButtonProps, TButtonPropsExcept } from 'types/button'
import clsx from 'clsx';
import { Require } from 'types/common';
import { COLOR } from 'utils/constant';

interface ButtonProps extends
    Require<AntdButtonProps, TButtonProps, TButtonPropsExcept> {
    fontSize?: string;
    fontWeight?: number | string;
    fit?: boolean;
    transparent?: boolean;
    isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
    className,
    children,
    fontSize = '14px',
    fontWeight = '400',
    type = 'primary',
    icon,
    shape,
    size = 'middle',
    onClick,
    htmlType,
    style,
    ...props
}) => {
    return (
        <AntdConfigProvider theme={{ token: { colorPrimary: COLOR.PRIMARY_BUTTON } }}>
            <AntdButton
                className={clsx('flex items-center', className)}
                style={{
                    fontSize,
                    fontWeight,
                    ...style
                }}
                {...{ type, icon, shape, size, onClick, htmlType }}
                {...props}
            >
                {children}
            </AntdButton>
        </AntdConfigProvider>
    )
}

export default Button

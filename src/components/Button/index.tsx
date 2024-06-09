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
    isLoading?: boolean;
    bgColor?: string;
}

const Button: FC<ButtonProps> = ({
    className,
    children,
    fontSize = '14px',
    fontWeight = '500',
    type = 'primary',
    icon,
    shape,
    size = 'large',
    onClick,
    htmlType,
    style,
    bgColor,
    ...props
}) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: bgColor || COLOR.PRIMARY_BUTTON,
            }
        }}>
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

import { forwardRef } from 'react'
import {
    Input as AntdInput,
    InputProps as AntdInputProps,
    InputRef as AntdInputRef,
    ConfigProvider as AntdConfigProvider,
} from 'antd'
import { TInputProps, TInputPropsExcept } from 'types/input'
import styles from './index.module.scss'
import clsx from 'clsx'
import { COLOR } from 'utils/constant'
import { Require } from 'types/common'

export const {
    Search: AntdSearch,
    TextArea: AntdTextArea
} = AntdInput

export interface InputProps extends
    Require<AntdInputProps, TInputProps, TInputPropsExcept> {
    isHeaderInput?: boolean
}

const Input = forwardRef<AntdInputRef, InputProps>(({
    className,
    placeholder,
    defaultValue,
    onChange,
    bordered = true,
    prefix,
    suffix,
    disabled = false,
    size = 'middle',
    onPressEnter,
    isHeaderInput = false,
    ...props
}, ref) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON
            }
        }}>
            <AntdInput
                className={clsx(styles.root, className)}
                {...{
                    placeholder,
                    defaultValue,
                    onChange,
                    bordered,
                    prefix,
                    suffix,
                    disabled,
                    size,
                    onPressEnter,
                    ...props
                }}
                ref={ref}
            />
        </AntdConfigProvider>
    )
})

Input.displayName = 'Input'
export default Input

import type { FC } from "react"
import styles from './index.module.scss'
import clsx from "clsx"
import {
    Select as AntdSelect,
    SelectProps as AntdSelectProps,
    ConfigProvider as AntdConfigProvider
} from "antd"
import { OptionProps as AntdOptionProps } from "antd/es/select"
import { TSelectProps, TOptionProps } from "types/select"
import { COLOR } from "utils/constant"
import { FaCaretDown } from "react-icons/fa"

const { Option: AntdOption } = AntdSelect

interface OptionProps extends
    Pick<Required<AntdOptionProps>, TOptionProps>,
    Omit<AntdOptionProps, TOptionProps> {}

export const Option: FC<OptionProps> = ({
    children,
    value
}) => {
    return (
        <AntdOption value={value}>
            {children}
        </AntdOption>
    )
}

interface SelectProps extends
    Pick<Required<AntdSelectProps>, TSelectProps>,
    Omit<AntdSelectProps, TSelectProps> {
    selectorBg?: string
}

export const Select: FC<SelectProps> = ({
    className,
    children,
    onChange,
    defaultValue,
    suffixIcon = <FaCaretDown />,
    selectorBg = COLOR.PRIMARY_BUTTON,
    ...props
}) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON
            },
            components: {
                Select: {
                    selectorBg
                }
            }
        }}>
            <AntdSelect
                className={clsx(styles.root, className)}
                onChange={onChange}
                defaultValue={defaultValue}
                suffixIcon={suffixIcon}
                // bordered={false}
                popupMatchSelectWidth={false}
                {...props}
            >
                {children}
            </AntdSelect>
        </AntdConfigProvider>
    )
}
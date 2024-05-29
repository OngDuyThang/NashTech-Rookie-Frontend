import { type FC } from "react"
import { ConfigProvider as AntdConfigProvider } from "antd"
import { TextAreaProps as AntdTextAreaProps } from "antd/es/input"
import { AntdTextArea } from ".."
import clsx from "clsx"
import styles from '../index.module.scss'
import { TTextAreaProps } from "types/input"
import { COLOR } from "utils/constant"

interface TextAreaProps extends
    Pick<Required<AntdTextAreaProps>, TTextAreaProps>,
    Omit<AntdTextAreaProps, TTextAreaProps> {}

const TextArea: FC<TextAreaProps> = ({
    className,
    ...props
}) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON
            }
        }}>
            <AntdTextArea
                className={clsx(styles.root, className)}
                {...props}
            />
        </AntdConfigProvider>
    )
}

export default TextArea
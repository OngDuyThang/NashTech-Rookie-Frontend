import { type FC } from 'react'
import {
    Modal as AntdModal,
    ModalProps as AntdModalProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { IoClose } from 'react-icons/io5';
import { TModalProps } from 'types/modal';
import { COLOR } from 'utils/constant';

interface ModalProps extends
    Pick<Required<AntdModalProps>, TModalProps>,
    Omit<AntdModalProps, TModalProps> {
    showFooter?: boolean
}

const Modal: FC<ModalProps> = ({
    children,
    className,
    title,
    open,
    showFooter = false,
    maskClosable = true,
    width,
    onOk,
    onCancel,
    cancelButtonProps,
    okButtonProps,
    centered = false,
    ...props
}) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON
            }
        }}>
            <AntdModal
                className={className}
                title={title}
                open={open}
                {...(!showFooter ? { footer: null } : null)}
                {...{
                    maskClosable,
                    width,
                    onOk,
                    onCancel,
                    cancelButtonProps,
                    okButtonProps,
                    centered
                }}
                closeIcon={<IoClose className='w-6 h-6' />}
                {...props}
            >
                {children}
            </AntdModal>
        </AntdConfigProvider>
    )
}

export default Modal

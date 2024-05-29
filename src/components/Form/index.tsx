import { ReactNode, type FC } from 'react'
import {
    Form as AntdForm,
    FormProps as AntdFormProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { COLOR } from 'utils/constant'

export const { Item, List, ErrorList, Provider, useForm, useFormInstance, useWatch } = AntdForm

interface FormProps extends AntdFormProps {
    children: ReactNode
}

const Form: FC<FormProps> = ({
    children,
    ...props
}) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON
            }
        }}>
            <AntdForm
                {...props}
            >
                {children}
            </AntdForm>
        </AntdConfigProvider>
    )
}

export default Form

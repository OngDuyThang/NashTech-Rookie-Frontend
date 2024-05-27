import { type FC } from 'react'
import {
    Spin as AntdSpin,
    SpinProps as AntdSpinProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'

const Spin: FC<AntdSpinProps> = (props) => {
    return (
        <AntdConfigProvider>
            <AntdSpin {...props} />
        </AntdConfigProvider>
    )
}

export default Spin

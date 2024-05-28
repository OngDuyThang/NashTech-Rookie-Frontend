import { type FC } from 'react'
import {
    Spin as AntdSpin,
    SpinProps as AntdSpinProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import { COLOR } from 'utils/constant'

const Spin: FC<AntdSpinProps> = (props) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON
            }
        }}>
            <AntdSpin {...props} />
        </AntdConfigProvider>
    )
}

export default Spin

import { CSSProperties, type FC } from 'react'
import {
    Pagination as AntdPagination,
    ConfigProvider as AntdConfigProvider,
    PaginationProps as AntdPaginationProps
} from 'antd'
import { COLOR } from 'utils/constant'

interface PaginationProps extends Record<'page' | 'limit' | 'total', number> {
    onChange: (
        page: number,
        limit: number
    ) => void,
    className?: string,
    style?: CSSProperties
}

const Pagination: FC<PaginationProps> = ({
    page,
    limit,
    total,
    onChange,
    className,
    style
}) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON
            }
        }}>
            <AntdPagination
                defaultCurrent={page}
                defaultPageSize={limit}
                total={total}
                onChange={onChange}
                showSizeChanger={false}
                className={className}
                style={style}
            />
        </AntdConfigProvider>
    )
}

export default Pagination

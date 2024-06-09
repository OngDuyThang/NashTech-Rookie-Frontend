import { type FC } from 'react'
import { AntdSearch } from 'components/Input'
import { SearchProps as AntdSearchProps } from 'antd/es/input'
import { TSearchProps } from 'types/input'
import styles from '../index.module.scss'
import clsx from 'clsx'
import { ConfigProvider as AntdConfigProvider } from 'antd'
import { COLOR } from 'utils/constant'
import { FaSearch } from "react-icons/fa";

interface SearchProps extends
    Pick<Required<AntdSearchProps>, TSearchProps>,
    Omit<AntdSearchProps, TSearchProps> {
    isHeaderInput?: boolean
}

const Search: FC<SearchProps> = ({
    enterButton = false,
    loading = false,
    onSearch,
    className,
    placeholder,
    defaultValue,
    onChange,
    bordered = true,
    prefix,
    suffix = <FaSearch />,
    disabled = false,
    size = 'middle',
    isHeaderInput = false,
    ...props
}) => {
    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON,
                borderRadius: 0,
            },
            components: {
                Input: {
                    paddingBlock: 8,
                    paddingBlockSM: 8
                }
            }
        }}>
            <AntdSearch
                className={clsx(styles.root, className)}
                enterButton={enterButton}
                loading={loading}
                onSearch={onSearch}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                bordered={bordered}
                prefix={prefix}
                suffix={suffix}
                disabled={disabled}
                size={size}
                {...props}
            />
        </AntdConfigProvider>
    )
}

export default Search

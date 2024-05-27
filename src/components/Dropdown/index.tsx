import { type FC } from 'react'
import {
    Dropdown as AntdDropdown,
    DropdownProps as AntdDropdownProps,
    ConfigProvider as AntdConfigProvider
} from 'antd'
import {
    TDropdownItems,
    TDropdownOnClick,
    TDropdownProps
} from 'types/dropdown'
import { Require } from 'types/common';

interface DropdownProps extends
Require<AntdDropdownProps, TDropdownProps, 'menu'> {
    // 2 keys of "menu" alternative "menu" props
    items: TDropdownItems;
    onClick: TDropdownOnClick;
}

const Dropdown: FC<DropdownProps> = ({
    className,
    children,
    items,
    onClick,
    ...props
}) => {

    return (
        <AntdConfigProvider>
            <AntdDropdown
                className={className}
                menu={{ items, onClick }}
                trigger={['click']}
                {...props}
            >
                <a
                    style={{ color: 'inherit' }}
                    onClick={(e) => e.preventDefault()}
                >
                    {children}
                </a>
            </AntdDropdown>
        </AntdConfigProvider>
    )
}

export default Dropdown

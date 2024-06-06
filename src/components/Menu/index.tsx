import { useEffect, useState, type FC } from 'react'
import {
    Menu as AntdMenu,
    MenuProps as AntdMenuProps,
    ConfigProvider as AntdConfigProvider,
} from 'antd';
import { TMenuProps } from 'types/menu';
import { COLOR } from 'utils/constant';
import { FaCaretDown } from 'react-icons/fa';
import styles from './index.module.scss'
import { cloneDeep } from 'lodash';

interface MenuProps extends
    Pick<Required<AntdMenuProps>, TMenuProps>,
    Omit<AntdMenuProps, TMenuProps> {
    setSelectedIds: (value: string[]) => void
}

const Menu: FC<MenuProps> = ({
    items,
    setSelectedIds,
    mode = 'inline',
    multiple = true,
    selectable = true,
    expandIcon = <FaCaretDown />,
    ...props
}) => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selecteds, setSelecteds] = useState<string[]>([]);

    useEffect(() => {
        setSelectedIds(cloneDeep([...openKeys, ...selecteds]))
    }, [selecteds, openKeys])

    const onOpenChange = (keys: string[]) => {
        // const latestOpenKey = keys.find((key) => !openKeys.includes(key));
        setOpenKeys(keys);
    };

    return (
        <AntdConfigProvider theme={{
            token: {
                colorPrimary: COLOR.PRIMARY_BUTTON,
                colorText: COLOR.BLACK_TEXT
            },
            components: {
                Menu: {
                    itemHoverBg: COLOR.LIGHT_BLUE,
                    itemActiveBg: COLOR.LIGHT_BLUE
                }
            }
        }}>
            <AntdMenu
                {...{ items, mode, multiple, selectable, expandIcon, ...props }}
                className={styles.root}
                style={{ width: '100%' }}
                onSelect={(item) => setSelecteds(prev => [...prev, item.key])}
                selectedKeys={selecteds}
                onDeselect={(item) => setSelecteds(prev => prev.filter(i => i !== item.key))}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            />
        </AntdConfigProvider>
    )
}

export default Menu

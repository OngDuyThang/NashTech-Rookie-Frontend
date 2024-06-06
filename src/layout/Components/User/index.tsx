import { Div, Image, Dropdown } from 'components'
import { useAppDispatch, useAppSelector } from 'hooks';
import { capitalize } from 'lodash';
import { type FC } from 'react'
import { FaUser } from 'react-icons/fa';
import { MdMail } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { logoutAction } from 'store/user/slice';
import { TDropdownItems } from 'types/dropdown';
import { userLogout } from 'utils/helper';

const User: FC = () => {
    const { username, email, picture } = useAppSelector(state => state.user)
    const iconCss: string = 'w-4 h-4'
    const items: TDropdownItems = [
        {
            label: username,
            icon: <FaUser className={iconCss} />,
            key: '1',
        },
        {
            label: email,
            icon: <MdMail className={iconCss} />,
            key: '2',
        },
        {
            label: capitalize('log out'),
            icon: <PiSignOutBold className={iconCss} />,
            key: '3',
            onClick: () => {
                userLogout()
            }
        },
    ];

    return (
        <Dropdown
            items={items}
            onClick={() => {}}
        >
            <Div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
                <Image
                    src={picture || '/images/user.png'}
                    alt='avatar'
                    fit="cover"
                />
            </Div>
        </Dropdown>
    )
}

export default User

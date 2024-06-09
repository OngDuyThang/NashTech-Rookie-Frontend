import { Div, Image, Dropdown } from 'components'
import { useAppDispatch, useAppSelector } from 'hooks';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { type FC } from 'react'
import { FaReceipt, FaUser } from 'react-icons/fa';
import { MdMail } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { logoutAction } from 'store/user/slice';
import { TDropdownItems } from 'types/dropdown';
import { userLogout } from 'utils/helper';

const User: FC = () => {
    const { username, email, picture } = useAppSelector(state => state.user)
    const router = useRouter()
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
            label: capitalize('my order'),
            icon: <FaReceipt className={iconCss} />,
            key: '3',
            onClick: () => {
                router.push({
                    pathname: '/order'
                })
            }
        },
        {
            label: capitalize('log out'),
            icon: <PiSignOutBold className={iconCss} />,
            key: '4',
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
            <Div className='w-[38px] h-[38px] rounded-full overflow-hidden'>
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

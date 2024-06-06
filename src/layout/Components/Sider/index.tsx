import { Button } from 'components'
import { type FC } from 'react'
import { FiMenu } from "react-icons/fi";

interface IProps {
    onClick: () => void
}

const OpenSider: FC<IProps> = ({ onClick }) => {
    return (
        <Button fontSize='12px' fontWeight='600'
            onClick={onClick}
            className={''}
        >
            <FiMenu />
        </Button>
    )
}

export default OpenSider

import { useQuery } from '@apollo/client';
import { OrderEntity } from '__generated__/graphql';
import { Collapse, CollapseProps } from 'antd';
import { Container } from 'components'
import { GET_ORDERS_BY_USER_ID } from 'graphql/order';
import { Title } from 'modules/Components'
import { type FC } from 'react'
import { SERVICE } from 'utils/constant';

const Order: FC = () => {
    const { data } = useQuery(GET_ORDERS_BY_USER_ID, {
        context: { service: SERVICE.ORDER }
    })

    const items: CollapseProps['items'] = (data?.findAllByUserId as OrderEntity[])?.map((order, index) => ({
        key: index,
        label: order.address,
        children: (
            <ul>
                {order?.items?.map((item, index) => (
                    <li key={index}>
                        Title: {item?.product?.title},
                        Price: {item?.product?.price},
                        Quantity: {item?.quantity}
                    </li>
                ))}
            </ul>
        ),
    })) || []

    return (
        <Container>
            <Title>
                My Order
            </Title>
            <Container className='p-4'>
                <Collapse items={items} defaultActiveKey={['1']} />
            </Container>
        </Container>
    )
}

export default Order

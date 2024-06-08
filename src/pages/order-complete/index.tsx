import { useMutation } from '@apollo/client'
import { LoadingScreen } from 'components'
import { UPDATE_PAYMENT_STATUS } from 'graphql/order'
import { useAppDispatch } from 'hooks'
import { cloneDeep, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, type FC } from 'react'
import { setUserCartCount } from 'store/cart/slice'
import { PAYMENT_STATUS, SERVICE } from 'utils/constant'
import { getAccessToken, isSession } from 'utils/helper'

const OrderCompletePage: FC = () => {
    const dispatch = useAppDispatch()
    const [updatePaymentStatus, { loading }] = useMutation(UPDATE_PAYMENT_STATUS)
    const router = useRouter()

    useEffect(() => {
        const orderId = router.query?.orderId as string

        if (!isEmpty(orderId) && isSession() && getAccessToken()) {
            (async () => {
                await updatePaymentStatus({
                    variables: { orderId: orderId, payment_status: PAYMENT_STATUS.PAID },
                    context: { service: SERVICE.ORDER }
                })

                const newQuery = cloneDeep(router.query)
                delete newQuery?.orderId
                router.replace({
                    pathname: router.pathname,
                    query: { ...newQuery }
                }, undefined, { shallow: true })

                dispatch(setUserCartCount(0))
            })()
        }
    }, [])

    if (loading) return <LoadingScreen />

    return (
        <div className="bg-white p-6  md:mx-auto">
            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg>
            <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Done!</h3>
                <p className="text-gray-600 my-2">Thank you for buying with us.</p>
                <p> Have a great day!  </p>
                <div className="py-10 text-center">
                    <a href="/" className="px-12 bg-blue-800 text-white font-semibold py-3 rounded">
                        GO BACK
                    </a>
                </div>
            </div>
        </div>
    )
}

export default OrderCompletePage

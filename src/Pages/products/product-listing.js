import { Footer, Loader } from '../../components/composite'
import { useData } from '../../helpers/contexts/data-context'
import { ProductShow, Filter } from '..'
import { MyToast } from '../../components/atomic'
import axios from 'axios'
import { useEffect } from 'react'

export function ProductListing() {
    const { dispatchData, popups, setPopups } = useData()
    useEffect(
        () =>
            (async () => {
                try {
                    setPopups((popups) => ({ ...popups, loader: true }))
                    const data = await Promise.all([
                        axios.get('/api/products'),
                        axios.get('/api/categories'),
                    ])
                    dispatchData({
                        type: 'ADD_CATEGORIES',
                        payload: data[1].data.categories,
                    })
                    dispatchData({
                        type: 'ADD_PRODUCTS',
                        payload: [...data[0].data.products].map((item) => ({
                            ...item,
                            price: Math.round(item.price / 70),
                        })),
                    })
                    setPopups((popups) => ({ ...popups, loader: false }))
                } catch (error) {
                    setPopups((popups) => ({ ...popups, loader: false }))
                    setPopups((popups) => ({ ...popups, toast: true }))
                    setTimeout(
                        () =>
                            setPopups((popups) => ({
                                ...popups,
                                toast: false,
                            })),
                        1500
                    )
                }
            })(),
        []
    )
    return popups.toast ? (
        <MyToast
            message="Error! Cannot fetch products"
            alertType="danger-alert"
        />
    ) : popups.loader ? (
        <div
            className="flex align-center flex-column justify-center"
            style={{ marginTop: '20vh' }}
        >
            <Loader />
            <h2>Loading your products! Hang in with us</h2>
        </div>
    ) : (
        <div className="flex flex-column" style={{ marginTop: '1rem' }}>
            <section className="flex">
                <Filter />
                <ProductShow />
            </section>
            <Footer />
        </div>
    )
}

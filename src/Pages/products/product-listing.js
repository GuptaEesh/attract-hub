import { Footer, Loader } from '../../components/composite'
import { useData } from '../../helpers/contexts/data-context'
import { ProductShow, Filter } from '..'
import { useEffect } from 'react'
import { getCategories, getProducts } from '../../helpers/utils'

export function ProductListing() {
    const { dispatchData, popups, setPopups } = useData()
    const { loader } = popups
    useEffect(() => {
        getCategories(setPopups, dispatchData)
        getProducts(setPopups, dispatchData)
    }, [])
    return (
        <>
            {' '}
            {loader ? (
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
            )}
        </>
    )
}

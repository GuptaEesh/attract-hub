import { Footer, Loader } from '../../components/composite'
import { useData } from '../../helpers/contexts/data-context'
import { ProductShow, Filter } from '..'
import { useEffect, useState } from 'react'
import { getCategories, getProducts } from '../../helpers/utils'
import { FaFilter } from 'react-icons/fa'

export function ProductListing() {
    const { dispatchData, popups, setPopups } = useData()
    const [isFilterOpen, setFilterOpen] = useState(false)
    const { loader } = popups
    useEffect(() => {
        getCategories(setPopups, dispatchData)
        getProducts(setPopups, dispatchData)
    }, [])
    useEffect(() => {
        isFilterOpen
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'auto')
    }, [isFilterOpen])
    return (
        <>
            {loader ? (
                <div className="flex align-center flex-column justify-center margin-top-r-20">
                    <Loader />
                    <h2>Loading your products! Hang in with us</h2>
                </div>
            ) : (
                <div className="flex flex-column product-listing-page margin-top-1">
                    <span className="flex justify-space-between filter-dropdown height-max-content text-white bold">
                        Filter
                        <h2
                            className=" cursor-pointer "
                            onClick={() => {
                                setFilterOpen(!isFilterOpen)
                            }}
                        >
                            <FaFilter className="text-white filter-icon" />
                        </h2>
                    </span>
                    <section className="flex product-filter-page">
                        <Filter
                            setFilterOpen={setFilterOpen}
                            isFilterOpen={isFilterOpen}
                        />

                        <ProductShow />
                    </section>
                    <Footer />
                </div>
            )}
        </>
    )
}

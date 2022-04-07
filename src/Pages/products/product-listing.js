import { Footer, Loader } from '../../components/composite'
import { useData } from '../../helpers/contexts/data-context'
import { ProductShow, Filter } from '..'
import { useEffect, useState } from 'react'
import { getCategories, getProducts } from '../../helpers/utils'

export function ProductListing() {
    const { dispatchData, popups, setPopups } = useData()
    const [isFilterOpen, setFilterOpen] = useState(true)
    const [screenwidth, setScreenWidth] = useState()
    const { loader } = popups
    const updateWindowWidth = () => {
        const width = window.innerWidth
        setScreenWidth(width)
    }
    useEffect(() => {
        getCategories(setPopups, dispatchData)
        getProducts(setPopups, dispatchData)
    }, [])
    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth)
        if (screenwidth <= '500') setFilterOpen(false)
    }, [screenwidth])
    useEffect(() => {
        isFilterOpen
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'auto')
    }, [isFilterOpen])
    return (
        <>
            {' '}
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
                            className="cursor-pointer"
                            onClick={() => {
                                setFilterOpen(!isFilterOpen)
                            }}
                        >
                            {isFilterOpen ? '^' : 'v'}
                        </h2>
                    </span>
                    <section className="flex product-filter-page">
                        {isFilterOpen && <Filter />}
                        <ProductShow />
                    </section>
                    <Footer />
                </div>
            )}
        </>
    )
}

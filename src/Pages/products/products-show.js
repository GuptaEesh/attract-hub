// import { useEffect, useRef, useState } from 'react'
import { Card, CardGrey, Loading } from '../../components/composite'
import { useFilter } from '../../helpers/contexts/filter-context'
import { useInfiniteScroll } from '../../helpers/utils'

export function ProductShow() {
    const { finalArray } = useFilter()
    const { loading, page, observerHandler } = useInfiniteScroll(finalArray)
    const slicePage = page - 1
    const firstArray = !slicePage
        ? finalArray.slice(slicePage * 8, page * 8)
        : finalArray.slice(0, slicePage * 8)
    const lastArray = slicePage ? finalArray.slice(slicePage * 8, page * 8) : []
    return (
        <div className="flex-4">
            <div className="products-section flex justify-space-around flex-wrap gap-2">
                {firstArray?.map((product) =>
                    product.inStock ? (
                        <Card
                            greyClass={false}
                            product={product}
                            key={product._id}
                        />
                    ) : (
                        <CardGrey
                            greyText="OUT OF STOCK"
                            product={product}
                            key={product._id}
                        />
                    )
                )}
            </div>

            <div className="products-section flex justify-space-around flex-wrap gap-2">
                {lastArray?.map((product) =>
                    product.inStock ? (
                        <Card
                            greyClass={false}
                            product={product}
                            key={product._id}
                        />
                    ) : (
                        <CardGrey
                            greyText="OUT OF STOCK"
                            product={product}
                            key={product._id}
                        />
                    )
                )}
            </div>
            <div ref={observerHandler}></div>
            {loading && (
                <article className="flex flex-column align-center justify-center">
                    <Loading />
                    <h5>Fetching more...</h5>
                </article>
            )}
        </div>
    )
}

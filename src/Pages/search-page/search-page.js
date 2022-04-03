import { useParams } from 'react-router-dom'
import noResults from '../../images/noResults.svg'
import { useEffect } from 'react'
import { Card, Loader } from '../../components/composite'
import { useData } from '../../helpers/contexts/data-context'
import { useFilter } from '../../helpers/contexts/filter-context'
import { getProducts } from '../../helpers/utils'
export function SearchPage() {
    const { keyword } = useParams()
    const { finalArray } = useFilter()
    const { dispatchData, popups, setPopups } = useData()
    const result = finalArray.filter(
        (resultItem) =>
            (resultItem.name.toLowerCase().includes(keyword.toLowerCase()) ||
                resultItem.brand
                    .toLowerCase()
                    .includes(keyword.toLowerCase())) &&
            resultItem.inStock
    )
    const { loader } = popups
    useEffect(() => {
        getProducts(setPopups, dispatchData)
    }, [])
    return loader ? (
        <div
            className="flex align-center flex-column justify-center"
            style={{ marginTop: '20vh' }}
        >
            <Loader />
            <h2>Showing you the search results! Hang on</h2>
        </div>
    ) : result.length === 0 ? (
        <div className="flex flex-column align-center">
            <img
                src={noResults}
                alt="No results found"
                style={{ width: '100vw', height: '80vh' }}
            />
            <h1>No results found, put in some other keyword</h1>
        </div>
    ) : (
        <div className="flex align-center flex-column align-centerflex-wrap">
            <marquee>
                Filtered using brand name and product name and showing items
                which are in stock
            </marquee>
            <h1 className="size-16">Search Page </h1>
            <p>
                Showing search results for items matching the word &apos;
                {keyword}
                &apos;
            </p>
            <section
                style={{ gap: '1rem' }}
                className="flex flex-wrap justify-space-around "
            >
                {finalArray.map(
                    (resultItem) =>
                        (resultItem.name
                            .toLowerCase()
                            .includes(keyword.toLowerCase()) ||
                            resultItem.brand
                                .toLowerCase()
                                .includes(keyword.toLowerCase())) &&
                        resultItem.inStock && (
                            <Card
                                greyClass={false}
                                product={resultItem}
                                key={resultItem._id}
                            />
                        )
                )}
            </section>
        </div>
    )
}

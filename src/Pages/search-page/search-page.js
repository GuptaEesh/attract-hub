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
        <div className="flex align-center flex-column justify-center margin-top-r-20">
            <Loader />
            <h2>Showing you the search results! Hang on</h2>
        </div>
    ) : result.length === 0 ? (
        <div className="flex flex-column align-center">
            <img
                src={noResults}
                className="width-r-100 height-r-80"
                alt="No results found"
            />
            <h3>No results found, put in some other keyword</h3>
        </div>
    ) : (
        <div className="flex align-center flex-column gap-1 align-centerflex-wrap">
            <h1 className="size-16">Search Page </h1>
            <h2 className="flex align-center gap-1">
                <span className="text-blue bold size-16">{result.length} </span>{' '}
                search results found
            </h2>
            <p>
                Showing search results for items matching the word &apos;
                {keyword}
                &apos;
            </p>
            <section className="flex flex-wrap justify-space-around gap-1 padding-2">
                {result.map((resultItem) => (
                    <Card
                        greyClass={false}
                        product={resultItem}
                        key={resultItem._id}
                    />
                ))}
            </section>
        </div>
    )
}

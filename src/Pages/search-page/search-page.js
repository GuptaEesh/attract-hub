import { useParams } from 'react-router-dom'
import { Card } from '../../components/composite'
import { useFilter } from '../../helpers/contexts/filter-context'
export function SearchPage() {
    const { keyword } = useParams()
    const { finalArray } = useFilter()
    return (
        <div className="flex align-center flex-column align-centerflex-wrap">
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
                        resultItem.name
                            .toLowerCase()
                            .includes(keyword.toLowerCase()) &&
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

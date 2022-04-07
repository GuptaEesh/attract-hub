import { Card, CardGrey } from '../../components/composite'
import { useFilter } from '../../helpers/contexts/filter-context'

export function ProductShow() {
    const { finalArray } = useFilter()
    return (
        <div className="flex products-section justify-space-around flex-wrap flex-5 gap-1">
            {finalArray.map((product) =>
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
    )
}

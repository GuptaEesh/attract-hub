/* eslint-disable react/jsx-key */
import { Radio, CheckBox } from '../../../components/atomic'
import { FilterHolder } from '../../../components/composite'
import { FaStar } from 'react-icons/fa'
import { useFilter } from '../../../helpers/contexts/filter-context'
import { useData } from '../../../helpers/contexts/data-context'
import {
    resetFilters,
    priceSliderHandler,
    highToLowHandler,
    lowToHighHandler,
    outOfStockHandler,
    fastDeliveryHandler,
    categorySelectionHandler,
    ratingsHandler,
} from './filter-controller'
import '../products-page.css'
export function Filter() {
    const { filters, dispatch } = useFilter()
    const { dataHandler } = useData()

    return (
        <div className="flex flex-column justify-space-around filter-section">
            <section className="flex justify-space-between flex-wrap">
                <h1> Filters </h1>
                <button
                    className="text-underline text-blue"
                    style={{ background: 'transparent' }}
                    onClick={() => resetFilters(dispatch)}
                >
                    {' '}
                    Clear Filters{' '}
                </button>
            </section>
            <FilterHolder legendName="Price Sort">
                <Radio
                    radioName="pricing"
                    radioText="High To Low"
                    checkStatus={filters.sortByPrice === 'htl'}
                    inputFunc={() => highToLowHandler(dispatch)}
                />
                <Radio
                    radioName="pricing"
                    radioText="Low To High"
                    checkStatus={filters.sortByPrice === 'lth'}
                    inputFunc={() => lowToHighHandler(dispatch)}
                />
            </FilterHolder>
            <FilterHolder legendName="Price Range">
                <label
                    className="slider-track flex flex-column"
                    style={{ gap: 'var(--size-12)' }}
                >
                    <span className="sm bold">
                        {filters.range == 0 ? (
                            <>All Products</>
                        ) : (
                            <>Product&apos;s price &lt; {filters.range * 1.5}</>
                        )}
                    </span>
                    <input
                        type="range"
                        style={{
                            width: '80%',
                            background:
                                filters.range == 0 && 'var(--primary-200)',
                        }}
                        className="slider"
                        onChange={(e) => priceSliderHandler(e, dispatch)}
                        value={filters.range}
                    />
                </label>
            </FilterHolder>
            <FilterHolder legendName="Other Filters">
                <CheckBox
                    checkBoxName="outOfStock"
                    checkBoxText="Stock-Out"
                    checkStatus={filters.outOfStock}
                    inputFunc={(e) => outOfStockHandler(e, dispatch)}
                />
                <CheckBox
                    checkBoxName="fastDelivery"
                    checkBoxText="Fast Delivery"
                    checkStatus={filters.fastDelivery}
                    inputFunc={(e) => fastDeliveryHandler(e, dispatch)}
                />
            </FilterHolder>
            <FilterHolder legendName="Category Filter">
                {dataHandler.categories.map(({ categoryName, id }) => (
                    <CheckBox
                        key={id}
                        checkBoxName={categoryName}
                        checkBoxText={categoryName}
                        checkStatus={filters.category.includes(categoryName)}
                        inputFunc={(e) => categorySelectionHandler(e, dispatch)}
                    />
                ))}
            </FilterHolder>
            <FilterHolder legendName="Ratings Filter">
                {' '}
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i.toString()}
                        className="flex align-center flex-wrap"
                        style={{ gap: '2px' }}
                    >
                        <Radio
                            radioName="ratings"
                            radioText={i}
                            inputFunc={() => ratingsHandler(i, dispatch)}
                        />
                        <FaStar size="1rem" color="var(--secondary-300)" />{' '}
                        <span className="sm bold"> & above </span>
                    </div>
                ))}
            </FilterHolder>
        </div>
    )
}

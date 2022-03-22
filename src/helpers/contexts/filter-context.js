import { createContext, useContext, useReducer } from 'react'
import { useData } from './data-context'
import { filtersReducer, initial } from '../reducers'
import {
    getFiltered,
    range,
    includeOutOfStock,
    fastDelivery,
    category,
    ratings,
    sortByPrice,
} from '../utils'

const FilterContext = createContext()

const FilterProvider = ({ children }) => {
    const [filters, dispatch] = useReducer(filtersReducer, initial)
    const { data } = useData()
    let finalArray = getFiltered(
        sortByPrice,
        range,
        includeOutOfStock,
        fastDelivery,
        category,
        ratings
    )(filters, data)
    return (
        <FilterContext.Provider value={{ filters, dispatch, finalArray }}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter = () => useContext(FilterContext)

export { FilterProvider, useFilter }

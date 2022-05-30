const initial = {
    sortByPrice: '',
    range: '0',
    outOfStock: false,
    fastDelivery: false,
    category: [],
    ratings: null,
}

const filtersReducer = (filters, action) => {
    switch (action.type) {
        case 'HIGH_TO_LOW':
            return {
                ...filters,
                sortByPrice: action.payload,
            }
        case 'LOW_TO_HIGH':
            return {
                ...filters,
                sortByPrice: action.payload,
            }
        case 'PRICE_RANGE':
            return {
                ...filters,
                range: action.payload,
            }
        case 'OUT_OF_STOCK':
            return {
                ...filters,
                outOfStock: action.payload,
            }
        case 'FAST_DELIVERY':
            return {
                ...filters,
                fastDelivery: action.payload,
            }
        case 'INCLUDE_CATEGORY':
            return action.from === 'home'
                ? { ...filters, category: [action.payload] }
                : filters.category.includes(action.payload)
                ? {
                      ...filters,
                      category: [...filters.category].filter(
                          (item) => item !== action.payload
                      ),
                  }
                : {
                      ...filters,
                      category: [...filters.category, action.payload],
                  }
        case 'RATINGS':
            return {
                ...filters,
                ratings: action.payload,
            }
        case 'CLEAR_ALL_FILTERS':
            return initial
        default:
            return filters
    }
}
export { filtersReducer, initial }

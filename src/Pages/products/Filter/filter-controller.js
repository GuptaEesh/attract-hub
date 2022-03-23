const resetFilters = (dispatch) =>
    dispatch({
        type: 'CLEAR_ALL_FILTERS',
    })
const priceSliderHandler = (e, dispatch) => {
    e.target.style.background = `linear-gradient(to right,var(--secondary-300) ${e.target.value}%,var(--primary-200) ${e.target.value}%)`
    dispatch({
        type: 'PRICE_RANGE',
        payload: e.target.value,
    })
}
const highToLowHandler = (dispatch) =>
    dispatch({
        type: 'HIGH_TO_LOW',
        payload: 'htl',
    })
const lowToHighHandler = (dispatch) =>
    dispatch({
        type: 'LOW_TO_HIGH',
        payload: 'lth',
    })
const outOfStockHandler = (e, dispatch) =>
    dispatch({
        type: 'OUT_OF_STOCK',
        payload: e.target.checked,
    })
const fastDeliveryHandler = (e, dispatch) =>
    dispatch({
        type: 'FAST_DELIVERY',
        payload: e.target.checked,
    })
const categorySelectionHandler = (e, dispatch) =>
    dispatch({
        type: 'INCLUDE_CATEGORY',
        payload: e.target.name,
    })
const ratingsHandler = (i, dispatch) =>
    dispatch({
        type: 'RATINGS',
        payload: i,
    })

export {
    resetFilters,
    priceSliderHandler,
    highToLowHandler,
    lowToHighHandler,
    outOfStockHandler,
    fastDeliveryHandler,
    categorySelectionHandler,
    ratingsHandler,
}

const dataReducer = (dataHandler, action) => {
    switch (action.type) {
        case 'ADD_PRODUCTS':
            return { ...dataHandler, data: action.payload }
        case 'ADD_CATEGORIES':
            return { ...dataHandler, categories: action.payload }
        default:
            return dataHandler
    }
}
export { dataReducer }

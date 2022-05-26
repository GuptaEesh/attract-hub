const dataReducer = (dataHandler, action) => {
    switch (action.type) {
        case 'ADD_ADDRESS':
            return action.operation === 'delete'
                ? {
                      ...dataHandler,
                      selectedAddress: '',
                      addresses: action.payload,
                  }
                : {
                      ...dataHandler,
                      addresses: action.payload,
                      selectedAddress:
                          action.payload[action.payload.length - 1],
                  }
        case 'ADDRESS_UPDATE':
            return { ...dataHandler, selectedAddress: action.payload }
        case 'ADD_PRODUCTS':
            return { ...dataHandler, data: action.payload }
        case 'ADD_CATEGORIES':
            return { ...dataHandler, categories: action.payload }
        default:
            return dataHandler
    }
}
export { dataReducer }

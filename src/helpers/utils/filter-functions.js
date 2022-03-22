const sortByPrice = (filters, data) => {
    switch (filters.sortByPrice) {
        case 'lth':
            return [...data].sort((a, b) => a.price - b.price)
        case 'htl':
            return [...data].sort((a, b) => b.price - a.price)
        default:
            return data
    }
}

const category = (filters, data) =>
    filters.category.length
        ? [...data].filter((product) =>
              filters.category.includes(product.categoryName)
          )
        : data

const range = (filters, data) =>
    filters.range && filters.range > 0
        ? [...data].filter((product) => product.price <= filters.range * 1.5)
        : data
const includeOutOfStock = (filters, data) =>
    filters.outOfStock ? data : [...data].filter((product) => product.inStock)
const fastDelivery = (filters, data) =>
    filters.fastDelivery
        ? [...data].filter((product) => product.fastDelivery)
        : data
const ratings = (filters, data) =>
    [...data].filter((product) => product.ratings >= filters.ratings)

let getFiltered =
    (...fns) =>
    (filters, data) =>
        fns.reduce((acc, curr) => curr(filters, acc), data)

export {
    range,
    includeOutOfStock,
    fastDelivery,
    ratings,
    category,
    sortByPrice,
    getFiltered,
}

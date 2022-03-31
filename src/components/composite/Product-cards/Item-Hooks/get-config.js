const getConfig = (token) => ({
    headers: {
        authorization: token,
    },
})
export { getConfig }

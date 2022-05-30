import { useEffect, useRef, useState } from 'react'

export const useInfiniteScroll = (finalArray) => {
    const observerHandler = useRef()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const fetchedArrayLength = Math.ceil(finalArray.length / 8)
    useEffect(() => {
        const lastElementObserver = observerHandler.current
        const handleObserver = (entries) => {
            const target = entries[0]
            if (
                target.isIntersecting &&
                (page < fetchedArrayLength || fetchedArrayLength === 0)
            ) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setPage((prev) => prev + 1)
                }, 1000)
            }
        }
        const observer = new IntersectionObserver(handleObserver)
        if (lastElementObserver) observer.observe(lastElementObserver)
        return () => {
            observer.unobserve(lastElementObserver)
        }
    }, [page, finalArray])
    return { loading, page, observerHandler }
}

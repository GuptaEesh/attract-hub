import './home-page.css'
import carImg from '../../images/lamboexh.png'
import { Button, MyToast } from '../../components/atomic'
import { CategoryCard, Footer, Loader } from '../../components/composite'
import { useNavigate } from 'react-router-dom'
import { useFilter } from '../../helpers/contexts/filter-context'
import { useData } from '../../helpers/contexts/data-context'
import { useEffect } from 'react'
import axios from 'axios'
export function Home() {
    const navigate = useNavigate()
    const { dispatch } = useFilter()
    const moveToProducts = () => navigate('/products')
    const categorySelectionHandler = (categoryName) => {
        dispatch({
            type: 'INCLUDE_CATEGORY',
            payload: categoryName,
            from: 'home',
        })
        navigate('/products')
    }
    const { dataHandler, dispatchData, popups, setPopups } = useData()
    useEffect(
        () =>
            (async () => {
                try {
                    setPopups((popups) => ({ ...popups, loader: true }))
                    const data = await axios.get('/api/categories')
                    dispatchData({
                        type: 'ADD_CATEGORIES',
                        payload: data.data.categories,
                    })
                    setPopups((popups) => ({ ...popups, loader: false }))
                } catch (error) {
                    setPopups((popups) => ({ ...popups, loader: false }))
                    setPopups((popups) => ({ ...popups, toast: true }))
                    setTimeout(
                        () =>
                            setPopups((popups) => ({
                                ...popups,
                                toast: false,
                            })),
                        1500
                    )
                }
            })(),
        []
    )
    return (
        <div className="flex flex-column justify-space-between">
            <div style={{ position: 'relative', marginBottom: '-5rem' }}>
                <img
                    src={carImg}
                    alt="Exhaust image"
                    className="img-responsive"
                />
                <Button
                    btnText="Buy Exhausts"
                    btnType="tertiary bold products-button"
                    btnFunc={moveToProducts}
                />
            </div>
            <div
                className="flex justify-space-around"
                style={{ marginBottom: '10rem', width: '100%' }}
            >
                {popups.toast ? (
                    <MyToast
                        message="Error:Cannot fetch categories"
                        alertType="danger-alert"
                    />
                ) : popups.loader ? (
                    <Loader />
                ) : (
                    dataHandler.categories.map(
                        ({ categoryName, id, image }) => (
                            <CategoryCard
                                key={id}
                                id={id}
                                title={categoryName}
                                imgSrc={image}
                                categorySelect={() =>
                                    categorySelectionHandler(categoryName)
                                }
                                content=""
                                productName={categoryName}
                            />
                        )
                    )
                )}
            </div>

            <Footer />
        </div>
    )
}

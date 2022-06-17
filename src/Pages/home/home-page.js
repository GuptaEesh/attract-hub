import './home-page.css'
// import carImg from '../../images/car.webp'
import { Button } from '../../components/atomic'
import { CategoryCard, Loader, Footer } from '../../components/composite'
import { useNavigate } from 'react-router-dom'
import { useFilter } from '../../helpers/contexts/filter-context'
import { useData } from '../../helpers/contexts/data-context'
import { useEffect } from 'react'
import { getCategories } from '../../helpers/utils'
export function Home() {
    const navigate = useNavigate()
    const { dispatch } = useFilter()
    const moveToProducts = () => {
        dispatch({
            type: 'CLEAR_ALL_FILTERS',
        })
        navigate('/products')
    }
    const categorySelectionHandler = (categoryName) => {
        dispatch({
            type: 'INCLUDE_CATEGORY',
            payload: categoryName,
            from: 'home',
        })
        navigate('/products')
    }
    const { dataHandler, dispatchData, popups, setPopups } = useData()
    useEffect(() => getCategories(setPopups, dispatchData), [])
    return (
        <div className="flex flex-column father-section justify-space-between">
            <section className="explore justify-center align-center flex flex-column gap-2">
                <h1>
                    Get some <span className="text-blue lg">cool</span> car
                    products
                </h1>
                <Button
                    btnText="Explore Products"
                    btnType="big-button bold "
                    btnFunc={moveToProducts}
                />
            </section>
            <div
                className="flex flex-wrap justify-space-around width-p-100 gap-1"
                style={{ marginTop: '-5rem', marginBottom: '5rem' }}
            >
                {popups.loader ? (
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

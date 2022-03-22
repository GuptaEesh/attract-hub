import './home-page.css'
import carImg from '../../images/lamboexh.png'
import { Button } from '../../components/atomic'
import { CategoryCard, Footer } from '../../components/composite'
import { useNavigate } from 'react-router-dom'
import { useFilter } from '../../helpers/contexts/filter-context'
import { useData } from '../../helpers/contexts/data-context'
export function Home() {
    const navigate = useNavigate()
    const { dispatch } = useFilter()
    const { categories, data } = useData()
    const moveToProducts = () => navigate('/products')
    const categorySelectionHandler = (categoryName) => {
        dispatch({
            type: 'INCLUDE_CATEGORY',
            payload: categoryName,
            from: 'home',
        })
        navigate('/products')
    }
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
                {categories.map(({ categoryName, id, image }) => (
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
                ))}
            </div>
            <div className="flex flex-column" style={{ gap: '2rem' }}>
                <h2 className="text-center size-16">Products Wall</h2>
                <section className="flex align-center justify-space-between">
                    <div
                        className="flex flex-wrap justify-space-around"
                        style={{ width: '36vw' }}
                    >
                        {data.slice(0, 2).map(({ image, id }) => (
                            <img
                                key={id}
                                src={image}
                                alt="product-images"
                                loading="lazy"
                                style={{ width: '50%' }}
                            />
                        ))}
                    </div>
                    <div
                        className="flex flex-wrap justify-space-around"
                        style={{ width: '36vw', height: '22vw' }}
                    >
                        {data.slice(9, 15).map(({ image, id }) => (
                            <img
                                key={id}
                                alt="product-images"
                                src={image}
                                loading="lazy"
                                style={{ width: '30%', height: '45%' }}
                            />
                        ))}
                    </div>

                    <div
                        className="flex flex-wrap justify-space-around align-center"
                        style={{ width: '24vw', height: '22vw' }}
                    >
                        {data.slice(5, 9).map(({ image, id }) => (
                            <img
                                key={id}
                                src={image}
                                loading="lazy"
                                style={{
                                    filter: 'brightness(0.7)',
                                    width: '45%',
                                    height: '40%',
                                }}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}
import './cards.css'
export function CategoryCard({
    title,
    imgSrc,
    productName,
    content,
    id,
    categorySelect,
}) {
    return (
        <div className="category-cards" onClick={categorySelect}>
            <h2 className="text-center" key={id}>
                {' '}
                {title}
            </h2>
            <img
                src={imgSrc}
                alt={productName}
                loading="eager"
                style={{ width: '100%', height: '80%' }}
            />
            <p>{content}</p>
        </div>
    )
}

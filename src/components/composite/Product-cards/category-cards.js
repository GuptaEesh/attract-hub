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
                className="width-p-100 height-p-80"
                src={imgSrc}
                alt={productName}
                loading="eager"
            />
            <p>{content}</p>
        </div>
    )
}

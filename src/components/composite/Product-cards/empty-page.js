import './cards.css'
export function EmptyPage({ imgSrc, altText }) {
    return (
        <div className="flex flex-column align-center justify-flex-end">
            <img className="empty-page-image" src={imgSrc} alt={altText} />
            <h2 className="text-blue size-16 empty-page-text">
                Select something to fill in your {altText.split(' ')[1]}!
            </h2>
        </div>
    )
}

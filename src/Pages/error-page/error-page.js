import NetworkError from '../../images/nwerror.svg'
export function ErrorPage() {
    return (
        <div>
            <img
                className="img-responsive height-r-80"
                src={NetworkError}
                alt="Network error image"
            />
        </div>
    )
}

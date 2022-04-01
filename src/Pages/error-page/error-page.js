import NetworkError from '../../images/nwerror.svg'
export function ErrorPage() {
    return (
        <div>
            <img
                style={{ height: '80vh' }}
                className="img-responsive"
                src={NetworkError}
                alt="Network error image"
            />
        </div>
    )
}

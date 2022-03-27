export function MyToast({ message, alertType }) {
    return (
        <div
            className="flex"
            style={{
                width: '100vw',
                marginTop: '2rem',
                justifyContent: 'flex-end',
            }}
        >
            <div
                className={`bold alert ${alertType}`}
                style={{ width: '20rem' }}
            >
                {message}
            </div>
        </div>
    )
}

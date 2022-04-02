export function MyToast({ message, alertType }) {
    return (
        <div
            className="flex"
            style={{
                width: '100%',
                position: 'fixed',
                top: '10%',
                zIndex: 3,
                marginTop: '2rem',
                justifyContent: 'flex-end',
            }}
        >
            <div
                className={`bold alert ${alertType}`}
                style={{
                    width: '30%',
                    border: '3px solid var(--primary-400)',
                    borderRight: 0,
                }}
            >
                {message} !
            </div>
        </div>
    )
}

import './atomic.css'
export function MyToast({ message, alertType }) {
    return (
        <div className="flex position-fixed width-p-100 margin-top-2 toast-wrapper">
            <div className={`bold toast-modify alert ${alertType}`}>
                {message} !
            </div>
        </div>
    )
}

import React from 'react'

export const Button = ({ disabled = false, btnFunc, btnText, btnType }) => {
    return (
        <button disabled={disabled} onClick={btnFunc} className={btnType}>
            {btnText}
        </button>
    )
}

import React from 'react'
export const Input = ({
    inputClass,
    checkStatus,
    inputFunc,
    inputName,
    inputPlaceHolder,
    inputType,
    inputValue,
}) => {
    return (
        <input
            checked={checkStatus}
            type={inputType}
            value={inputValue}
            name={inputName}
            onChange={inputFunc}
            className={inputClass}
            placeholder={inputPlaceHolder}
        />
    )
}

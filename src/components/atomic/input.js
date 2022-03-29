import React from 'react'
export const Input = ({
    inputClass,
    checkStatus,
    inputFunc,
    inputName,
    inputPlaceHolder,
    inputType,
    inputValue,
    pattern,
}) => {
    return (
        <input
            checked={checkStatus}
            pattern={pattern}
            type={inputType}
            value={inputValue}
            name={inputName}
            onChange={inputFunc}
            className={inputClass}
            placeholder={inputPlaceHolder}
            required
        />
    )
}

import { useState } from 'react'
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs'
import { Input } from '../../atomic'
import './inputbox.css'
export function InputPass({
    title: name,
    inputClass,
    inputPlaceHolder,
    inputValue,
    inputFunc,
    pattern,
}) {
    const [visibility, setVisibility] = useState(false)

    return (
        <label className="flex flex-column">
            <span className="text-white">{name}</span>
            <div className="password-container">
                <Input
                    inputClass={inputClass}
                    inputType={visibility ? 'text' : 'password'}
                    inputPlaceHolder={inputPlaceHolder}
                    pattern={pattern}
                    inputValue={inputValue}
                    inputFunc={inputFunc}
                />
                {visibility ? (
                    <BsEyeSlash
                        className="position-absolute cursor-pointer pass-viewer"
                        onClick={() => setVisibility(!visibility)}
                    />
                ) : (
                    <BsEyeFill
                        onClick={() => setVisibility(!visibility)}
                        className="position-absolute cursor-pointer pass-viewer"
                    />
                )}
            </div>
        </label>
    )
}

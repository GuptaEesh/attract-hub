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
                        onClick={() => setVisibility(!visibility)}
                        style={{
                            position: 'absolute',
                            right: '2%',
                            cursor: 'pointer',
                        }}
                        color="var(--primary-400)"
                    />
                ) : (
                    <BsEyeFill
                        onClick={() => setVisibility(!visibility)}
                        style={{
                            position: 'absolute',
                            right: '2%',
                            cursor: 'pointer',
                        }}
                        color="var(--primary-400)"
                    />
                )}
            </div>
        </label>
    )
}

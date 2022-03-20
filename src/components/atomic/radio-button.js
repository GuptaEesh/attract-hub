import { Input } from './index'

export const Radio = ({ radioName, radioText, checkStatus, inputFunc }) => {
    return (
        <label className="flex align-center md bold">
            <Input
                inputClass="radio-input"
                inputType="radio"
                inputFunc={inputFunc}
                inputName={radioName}
                checkStatus={checkStatus}
            />
            <div className="select-dot radio-dot"></div>
            {radioText}
        </label>
    )
}

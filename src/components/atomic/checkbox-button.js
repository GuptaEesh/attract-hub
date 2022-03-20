import { Input } from './index'

export const CheckBox = ({
    checkBoxName,
    checkBoxText,
    inputFunc,
    checkStatus,
}) => {
    return (
        <label className="flex align-center md bold">
            <Input
                inputClass="checkbox-input"
                inputType="checkbox"
                inputFunc={inputFunc}
                inputName={checkBoxName}
                checkStatus={checkStatus}
            />
            <div className="select-dot checkbox-dot"></div>
            {checkBoxText}
        </label>
    )
}

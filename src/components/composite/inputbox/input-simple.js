import { Input } from '../../atomic'

export function InputSimple({
    title: name,
    inputClass,
    inputPlaceHolder,
    inputType,
    inputValue,
    inputFunc,
    pattern,
}) {
    return (
        <label className="flex flex-column">
            <span className="text-white">{name}</span>
            <Input
                inputClass={inputClass}
                inputType={inputType}
                pattern={pattern}
                inputPlaceHolder={inputPlaceHolder}
                inputValue={inputValue}
                inputFunc={inputFunc}
            />
        </label>
    )
}

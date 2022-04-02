import { Input } from '../../atomic'
import './address.css'
export function Form({ buttonText, changeHandle, value, handleSubmit }) {
    return (
        <>
            <h1 className="text-center size-16">Address Management</h1>
            <form
                className="address-form flex flex-column align-center"
                onSubmit={handleSubmit}
            >
                <Input
                    inputClass="input-text sm"
                    inputName="name"
                    inputValue={value.name}
                    inputType="text"
                    inputPlaceHolder="name..."
                    inputFunc={changeHandle}
                />

                <Input
                    inputClass="input-text sm"
                    inputName="number"
                    inputValue={value.number}
                    inputType="number"
                    inputPlaceHolder="number"
                    inputFunc={changeHandle}
                />
                <Input
                    inputClass="input-text sm"
                    inputName="livingAddress"
                    inputValue={value.livingAddress}
                    inputType="text"
                    inputPlaceHolder="livingAddress"
                    inputFunc={changeHandle}
                />
                <Input
                    inputType="submit"
                    inputClass="btn primary without-shadow"
                    inputValue={buttonText}
                />
            </form>
        </>
    )
}

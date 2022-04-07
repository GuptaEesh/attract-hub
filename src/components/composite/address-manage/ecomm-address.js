import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AddressList } from './address-list'
import { Form } from './address-form'
import { useData } from '../../../helpers/contexts/data-context'
import './address.css'
export function AddressManage() {
    const [value, setValue] = useState({})
    const { dataHandler, dispatchData, setPopups } = useData()

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let isP = false
        setTimeout(
            () =>
                setPopups((popups) => ({
                    ...popups,
                    toast: true,
                    toastMessage: 'Added address',
                    toastType: 'success-alert',
                })),
            500
        )
        setTimeout(
            () =>
                setPopups((popups) => ({
                    ...popups,
                    toast: true,
                    toastMessage: 'Please select the address below',
                    toastType: 'neutral-alert',
                })),
            1200
        )
        setTimeout(
            () =>
                setPopups((popups) => ({
                    ...popups,
                    toast: false,
                })),
            1500
        )

        let newAddress = dataHandler.addresses.map((addressCheck) => {
            if (addressCheck.isEdit) {
                setBtn('Add')
                isP = true
                return {
                    ...addressCheck,
                    livingAddress: value.livingAddress,
                    number: value.number,
                    name: value.name,
                    isEdit: false,
                }
            } else return addressCheck
        })
        if (!isP)
            newAddress = [
                ...dataHandler.addresses,
                { ...value, id: uuidv4(), isEdit: false },
            ]
        dispatchData({ type: 'ADD_ADDRESS', payload: newAddress })
        setValue({ name: '', number: '', livingAddress: '' })
    }

    let [btn, setBtn] = useState('Add')
    const edit = (address) => {
        scrollToTop()
        setBtn('Update')
        setValue({
            name: address.name,
            number: address.number,
            livingAddress: address.livingAddress,
        })
        address.isEdit = true
    }
    const changeHandle = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    const deleteAddress = (address) => {
        let updatedAdresses = dataHandler.addresses.filter(
            (addressCheck) => address.id !== addressCheck.id
        )
        dispatchData({
            type: 'ADD_ADDRESS',
            payload: updatedAdresses,
            operation: 'delete',
        })
    }
    return (
        <div className="flex address-setter flex-column gap-1 padding-1">
            <Form
                changeHandle={changeHandle}
                handleSubmit={handleSubmit}
                value={value}
                buttonText={btn}
            />
            <span className=" size-16 text-center bold">Added Addresses</span>
            <section className="flex flex-column table-container gap-1">
                <table className="text-white padding-1 address-table">
                    <tbody>
                        <tr>
                            {['S.No.', 'Name', 'Address', 'PhoneNumber'].map(
                                (item) => (
                                    <td className="address-details" key={item}>
                                        {item}
                                    </td>
                                )
                            )}
                        </tr>

                        <AddressList
                            deleteAddress={deleteAddress}
                            edit={edit}
                        />
                    </tbody>
                </table>
            </section>
        </div>
    )
}

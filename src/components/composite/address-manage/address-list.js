import { useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { AiTwotoneDelete } from 'react-icons/ai'
import { GrSelect } from 'react-icons/gr'
import { useData } from '../../../helpers/contexts/data-context'
import './address.css'
export function AddressList({ edit, deleteAddress }) {
    const { dispatchData, dataHandler, setPopups } = useData()
    const navigate = useNavigate()
    return dataHandler.addresses.map((address, index) => (
        <tr key={address.id} className="address-field">
            <td
                className="select-address flex align-center flex-wrap"
                onClick={() => {
                    dispatchData({
                        type: 'ADDRESS_UPDATE',
                        payload: address,
                    })
                    setTimeout(() => navigate('/checkout'), 200)
                    setTimeout(
                        () =>
                            setPopups((popups) => ({
                                ...popups,
                                toast: true,
                                toastMessage: 'Updated the address',
                                toastType: 'success-alert',
                            })),
                        0
                    )
                    setTimeout(
                        () =>
                            setPopups((popups) => ({
                                ...popups,
                                toast: false,
                            })),
                        500
                    )
                }}
            >
                <p className="address-text size-12">{index + 1}.</p>
                <GrSelect />
            </td>

            <td>
                <p className="address-text size-12">{address.name}</p>
            </td>

            <td>
                <p className="address-text size-12">{address.livingAddress}</p>
            </td>
            <td className="flex align-center justify-space-around">
                <p className="address-text size-12">{address.number}</p>
                <FaEdit
                    className="edit-address"
                    onClick={() => edit(address)}
                />
                <AiTwotoneDelete
                    className="delete-address"
                    onClick={() => deleteAddress(address)}
                />
            </td>
        </tr>
    ))
}

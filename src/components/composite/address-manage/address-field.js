import { useNavigate } from 'react-router-dom'
import { useData } from '../../../helpers/contexts/data-context'
import { Button } from '../../atomic'
import './address.css'
export function AddressField() {
    const navigate = useNavigate()
    const { dataHandler } = useData()
    const { name, livingAddress: address, number } = dataHandler.selectedAddress
    return dataHandler.addresses.length === 0 ? (
        <Button
            btnText="Add Address"
            btnType="btn secondary bold"
            btnFunc={() => navigate('/manage-address')}
        />
    ) : (
        <div className="flex flex-column address-holder">
            <table>
                <tbody>
                    <tr>
                        <td>Your Name</td>
                        <td className="bold">{name}</td>
                    </tr>
                    <tr>
                        <td>Contact Number</td>
                        <td className="bold">{number}</td>
                    </tr>
                    <tr>
                        <td>Your Address</td>
                        <td className="bold">{address}</td>
                    </tr>
                </tbody>
            </table>
            <Button
                btnText="Change Address"
                btnType="btn secondary bold"
                btnFunc={() => navigate('/manage-address')}
            />
        </div>
    )
}

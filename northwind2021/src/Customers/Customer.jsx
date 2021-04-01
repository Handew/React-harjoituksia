import React, { useState } from 'react'
import '../App.css';



const Customer = ({ customer, handleDeleteClick, handleEditClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)


    return (
        <>
            <h3><nobr
                onClick={() => setNäytäEnemmän(!näytäEnemmän)}
            >
                {customer.companyName}

            </nobr>

                <button id="nappi" onClick={() => handleDeleteClick(customer.customerId)}>Delete</button>

                <button id="nappi" onClick={() => handleEditClick(customer)}>Edit</button>

            </h3>

            {näytäEnemmän && <table className="center">
                <thead>
                    <tr>
                        <th>Contact person</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.contactName}{' '}</td>
                        <td>{customer.phone}{' '}</td>
                        <td>{customer.address}{' '}</td>
                        <td>{customer.city}{' '}</td>
                        <td>{customer.country}{' '}</td>
                    </tr>
                </tbody>
            </table>}

        </>
    )
}

export default Customer;

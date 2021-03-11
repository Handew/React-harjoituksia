import React, { useState } from 'react'
import './App.css';



const Customer = ({ customer, handleDeleteClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)


    return (
        <>
            <td>
                <tr>
                    <th>
                        <h3 onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
                            {customer.companyName}</h3>
                    </th>
                    <th>
                        <button style={{pointer: 'hover'}} onClick={() => handleDeleteClick(customer.customerId)}>Delete</button>
                    </th>
                    <th>
                        <button>Edit</button>
                    </th>
                </tr>
            </td>
            {näytäEnemmän && <table>
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
                        <td>{customer.contactName}{' | '}</td>
                        <td>{customer.phone}{' | '}</td>
                        <td>{customer.address}{' | '}</td>
                        <td>{customer.city}{' | '}</td>
                        <td>{customer.country}{' | '}</td>
                    </tr>
                </tbody>
            </table>}

        </>
    )
}

export default Customer;

import React, { useState } from 'react'
import './App.css';




const Customer = ({ customer }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)


    return (
        <>
            <h3 onMouseOver={() => setNäytäEnemmän(!näytäEnemmän)}
                onMouseLeave={() => setNäytäEnemmän(!näytäEnemmän)}
            >
                {customer.companyName}
            </h3>

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

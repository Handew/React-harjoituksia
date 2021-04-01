import React from 'react'
import '../App.css';



const Employee = ({ employee, handleDeleteClick, handleEditClick }) => {
    

    return (
        <>
            <tr>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.title}</td>
                <td>{employee.address}</td>
                <td>{employee.city}</td>
                <td>{employee.postalCode}</td>
                <td>{employee.country}</td>
                <td>
                    <button id="nappi" onClick={() => handleDeleteClick(employee.employeeId)}>Delete</button>
                    <button id="nappi" onClick={() => handleEditClick(employee)}>Edit</button>
                </td>
            </tr>
        </>
    )
}
    
export default Employee
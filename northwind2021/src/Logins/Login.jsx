// import React, { useState } from 'react'
import '../App.css'

const Login = ({ login, handleDeleteClick }) => {

    return (
        <>
            <tr>
                <td>{login.userName}</td>
                <td>{login.firstName}</td>
                <td>{login.lastName}</td>
                <td>{login.email}</td>
                <td>
                    <button id="nappi" onClick={() => handleDeleteClick(login.loginId)}>Delete</button>
                </td>
            </tr>
        </>
    )
}

export default Login
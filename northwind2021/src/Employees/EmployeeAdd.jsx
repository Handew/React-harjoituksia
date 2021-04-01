import React, { useState } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'

const EmployeeAdd = ({ setLisäystila, setEmployees, employees, setMessage, setShowMessage,
    setIsPositive }) => {

    // State määritykset

    // const [newEmployeeId, setNewEmployeeId] = useState('')
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')

    const [newPostalCode, setNewPostalCode] = useState('')


    // Lomakkeen onSubmit tapahtumankäsittelijä

    const submitEmployee = (event) => {
        event.preventDefault()
        var newEmployee = {
            firstName: newFirstName,
            lastName: newLastName,
            title: newTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode
        }

        const jwt = localStorage.getItem("token")
        EmployeeService.setToken(jwt)

        try {
            EmployeeService // Käytetään services/employee tiedoston..
                .create(newEmployee) // ..create metodia back-end http pyyntöön
                .then(response => console.log(response.data))
                console.log(newEmployee.lastName)
            setMessage(`Lisätty ${newEmployee.lastName}`)
            setIsPositive(true)
            setShowMessage(true)
            setEmployees(employees.concat(newEmployee))
                
            setTimeout(() => {
                setShowMessage(false)
            },
                6000
            )
        }
        catch (e) {
            setMessage(`Tapahtui virhe: ${e}`)
            setIsPositive(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            },
                6000
            )
        }
        finally {

            setLisäystila(false)

        }
    }

    // Komponentti palauttaa käyttöliittymään form elementin

    return (
        <form onSubmit={submitEmployee}>

            {/* inputien tapahtumankäsittelijät on funktiota, jotka saa parametrikseen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newFirstName} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstName(target.value)} />
            </div>
            <div>
                <input type="text" value={newLastName} placeholder="Lastname"
                    onChange={({ target }) => setNewLastName(target.value)} />
            </div>
            <div>
                <input type="text" value={newTitle} placeholder="Title"
                    onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <input type="text" value={newAddress} placeholder="Address"
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="City"
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
                <input type="text" value={newPostalCode} placeholder="Postal code"
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>

            <button id="nappi" type="submit" style={{ background: 'green' }}>Create</button>

            <button id="nappi" onClick={() => setLisäystila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default EmployeeAdd
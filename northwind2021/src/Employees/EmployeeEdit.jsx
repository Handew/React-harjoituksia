import React, { useState } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'

const EmployeeEdit = ({ setMuokkaustila, setEmployees, employees, setMessage, setShowMessage,
    setIsPositive, muokattavaEmployee }) => {

    // Edit komponentin State määritykset. Alkutila otetaan propsina saadusta MuokattavaCustomer oliosta (yläpuolella oleva rivi).
    // Se alkutila tulee myös input kenttiin alkutilaksi, koska input kentän sisältö on sidottu näihin state:hin.
    // Input kentän muutos muuttaa kyseistä statea samoin kuin add komponentissakin tapahtui.

    // const [newEmployeeId, setNewEmployeeId] = useState(muokattavaEmployee.employeeId)
    const [newFirstName, setNewFirstName] = useState(muokattavaEmployee.firstName)
    const [newLastName, setNewLastName] = useState(muokattavaEmployee.lastName)
    const [newTitle, setNewTitle] = useState(muokattavaEmployee.title)

    const [newCountry, setNewCountry] = useState(muokattavaEmployee.country)
    const [newAddress, setNewAddress] = useState(muokattavaEmployee.address)
    const [newCity, setNewCity] = useState(muokattavaEmployee.city)

    const [newPostalCode, setNewPostalCode] = useState(muokattavaEmployee.postalCode)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä. Tämä koodi ajetaan kun painetaan talleta / save nappia.

    const submitEmployee = (event) => {
        event.preventDefault()
        var changedEmployee = {
            fistName: newFirstName,
            lastName: newLastName,
            title: newTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode
        }

        EmployeeService
            .update(muokattavaEmployee.employeeId, changedEmployee) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    const id = changedEmployee.employeeId

                    // Poistetaan ensin vanha employee statesta
                    setEmployees(employees.filter(filtered => filtered.employeeId !== id))

                    // Ja lisätään uudestaan muuttuneilla tiedoilla
                    setEmployees(employees.concat(changedEmployee))

                    setMessage(`Päivitetty ${changedEmployee.lastName}`)
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000
                    )
                }

            })
            .catch(error => {
                setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 7000
                )
            })
        
        // Tämä setTimout on lisätty myös CustomerAdd tiedostoon. Annetaan 0,5sek aikaa tietokannalle tallettaa
        // ennenkuin palataan asiakkaiden listausnäkymään. Silloin saadaan listaus ajantasaiseksi.

        setTimeout(() => {
            setMuokkaustila(false)
        }, 500
        )


    }
    // Komponentti palauttaa käyttöliittymään form elementin
    // Lisätty required 2 ensimmäiseen inputiin, samoin kuin add komponentissakin. Näin ei voida luoda täysin tyhjiä customereita.
    // Eikä sotkea ID:tä.
    //TODO:
    //Itseasiassa ID pitäisi olla tässä kohtaa kiinteä, jota ei voi edes muokata.

    return (
        <form onSubmit={submitEmployee}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}

            <div>
                <input type="text" value={newFirstName} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastName} placeholder="Lastname"
                    onChange={({ target }) => setNewLastName(target.value)} required/>
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

            <button type="submit" style={{ background: 'green' }}>Save</button>

            <button onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default EmployeeEdit
import React, { useState } from 'react'
import '../App.css'
import CustomerService from '../services/customer'

const CustomerEdit = ({ setMuokkaustila, setCustomers, customers, setMessage, setShowMessage,
    setIsPositive, muokattavaCustomer }) => {

    // Edit komponentin State määritykset. Alkutila otetaan propsina saadusta MuokattavaCustomer oliosta (yläpuolella oleva rivi).
    // Se alkutila tulee myös input kenttiin alkutilaksi, koska input kentän sisältö on sidottu näihin state:hin.
    // Input kentän muutos muuttaa kyseistä statea samoin kuin add komponentissakin tapahtui.

    const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

    const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState(muokattavaCustomer.city)

    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
    const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

    // Muokkauslomakkeen onSubmit tapahtumankäsittelijä. Tämä koodi ajetaan kun painetaan talleta / save nappia.

    const submitCustomer = (event) => {
        event.preventDefault()
        var changedCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }

        CustomerService
            .update(changedCustomer) // Put pyyntö back-endille
            .then(response => {

                if (response.status === 200) {

                    const id = changedCustomer.customerId

                    // Poistetaan ensin vanha customer statesta
                    setCustomers(customers.filter(filtered => filtered.customerId !== id))

                    // Ja lisätään uudestaan muuttuneilla tiedoilla
                    setCustomers(customers.concat(changedCustomer))

                    setMessage(`Päivitetty ${changedCustomer.companyName}`)
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
        <form onSubmit={submitCustomer}>

            {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen
            input elementin target tiedon. Funktiot kutsuvat set state hookia parametrina target.value */}
            <div>
                <input type="text" value={newCustomerId} placeholder="ID with 5 capital letters" maxLength="5" minLength="5"
                    onChange={({ target }) => setNewCustomerId(target.value)} required />
            </div>
            <div>
                <input type="text" value={newCompanyName} placeholder="Company name"
                    onChange={({ target }) => setNewCompanyName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newContactName} placeholder="Contact name"
                    onChange={({ target }) => setNewContactName(target.value)} />
            </div>
            <div>
                <input type="text" value={newContactTitle} placeholder="Contact title"
                    onChange={({ target }) => setNewContactTitle(target.value)} />
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
            <div>
                <input type="text" value={newPhone} placeholder="Phone"
                    onChange={({ target }) => setNewPhone(target.value)} />
            </div>
            <div>
                <input type="text" value={newFax} placeholder="Fax"
                    onChange={({ target }) => setNewFax(target.value)} />
            </div>

            <button type="submit" style={{ background: 'green' }}>Save</button>

            <button onClick={() => setMuokkaustila(false)} style={{ background: 'red' }}>
                Cancel</button>
        </form>
    )
}

export default CustomerEdit
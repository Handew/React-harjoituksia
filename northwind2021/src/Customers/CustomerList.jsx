/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react"
import "../App.css"
import CustomerService from "../services/customer"
import Customer from "./Customer"
import CustomerAdd from "./CustomerAdd"
import CustomerEdit from "./CustomerEdit"
import Message from "../Message"

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [näytetäänkö, setNäytetäänkö] = useState(false)
  const [search, setSearch] = useState("")
  const [lisäysTila, setLisäystila] = useState(false)
  const [muokkausTila, setMuokkaustila] = useState(false)
  const [muokattavaCustomer, setMuokattavaCustomer] = useState({}) // yksi customer olio

  const [showMessage, setShowMessage] = useState(false)
  const [isPositive, setIsPositive] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    CustomerService.setToken(token)
    CustomerService
    .getAll()
    .then((data) => {
      setCustomers(data)
    })
  }, [lisäysTila, näytetäänkö, muokkausTila])

  const handleSearchInputChange = (event) => {
    setNäytetäänkö(true)
    setSearch(event.target.value.toLowerCase())
  }

  const handleDeleteClick = (id) => {
    //Kaivetaan esiin koko customer olio jotta alertissa voidaan näyttää companyName id:n sijaan
    const customer = customers.find((cust) => cust.customerId === id)

    // Poiston varmistus kyselyikkuna
    const confirm = window.confirm(
      `Haluatko todella poistaa: ${customer.companyName}:n pysyvästi?`
    )

    if (confirm) {
      CustomerService.remove(id)
        .then((response) => {
          if (response.status === 200) {
            // Poistetaan customer statesta
            setCustomers(
              customers.filter((filtered) => filtered.customerId !== id)
            );

            setMessage(`${customer.companyName}:n poisto onnistui!`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

            setTimeout(() => {
              setShowMessage(false)
            }, 4000)
          }
        })

        .catch((error) => {
          console.log(error)
          setMessage(
            `Tapahtui virhe: ${error}. Onkohan asiakkaalla tilauksia?`
          );
          setIsPositive(false)
          setShowMessage(true)
          setNäytetäänkö(false)

          setTimeout(() => {
            setShowMessage(false)
          }, 7000)
        })
    } else {
      // JOS KÄYTTÄJÄ EI VAHVISTANUT POISTOA:
      setMessage("Poisto peruutettu")
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 4000)
    }
  }

  const handleEditClick = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
  }

  return (
    <>
      <div className="content">
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => setNäytetäänkö(!näytetäänkö)}
        >
          customers
          <button
            id="nappi"
            style={{ cursor: "pointer" }}
            onClick={() => setLisäystila(true)}
          >
            Add new
          </button>
        </h1>

        {showMessage && <Message message={message} isPositive={isPositive} />}

        {/* <input value={search} onChange={handleSearchInputChange} /> */}

        {!lisäysTila && !muokkausTila && (
          <input
            placeholder="Search by company name"
            value={search}
            onChange={handleSearchInputChange}
          />
        )}

        {customers &&
          näytetäänkö &&
          !lisäysTila &&
          !muokkausTila &&
          customers.map((customer) => {
            const lowerCaseName = customer.companyName.toLowerCase();
            if (lowerCaseName.indexOf(search) > -1) {
              return (
                <Customer
                  key={customer.customerId}
                  customer={customer}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                />
              );
            }
          })}
        {!customers && <p>Loading...</p>}

        {lisäysTila && (
          <CustomerAdd
            setLisäystila={setLisäystila}
            customers={customers}
            setCustomers={setCustomers}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}

        {muokkausTila && (
          <CustomerEdit
            setMuokkaustila={setMuokkaustila}
            muokattavaCustomer={muokattavaCustomer}
            customers={customers}
            setCustomers={setCustomers}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}
      </div>
    </>
  )
}

export default CustomerList

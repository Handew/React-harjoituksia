import React, { useState, useEffect } from 'react'
import './App.css';
import CustomerService from './services/customer'
import Customer from './Customer'


const CustomerList = () => {

    const [customers, setCustomers] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)

    useEffect(() => {
        CustomerService
        .getAll()
        .then(data => {
            //console.log(data)
            setCustomers(data)
        })
    }, [])

  return (
    <>
        <h1 style={{ cursor: 'pointer' }} onClick={() => setNäytetäänkö(!näytetäänkö)}>customers</h1>
        
        {customers && näytetäänkö === true && customers.map(customer => 
            <Customer customer={customer} /> 
            )}
            {!customers && <p>Loading...</p>}
    </>
  );
}

export default CustomerList;

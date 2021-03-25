import React, { useState, useEffect } from "react";
import "./App.css";
import CustomerList from "./Customers/CustomerList";
import LoginList from "./Logins/LoginList";
import EmployeeList from "./Employees/EmployeeList"
import ProductList from "./Products/ProductList"
import LoginForm from "./LoginForm"
import Homepage from './HomePage'

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {

  const [currentUser, setCurrentUser] = useState();

  // use effectissä tarkistetaan onko selaimen local storagessa user tietoa
  useEffect(() => {
    const userFromLS = localStorage.getItem('user')
    if (userFromLS) {
      setCurrentUser(userFromLS)
    }
  }, []
  )

if (currentUser) {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Navbar.Brand href="#home">Northwind</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to={'/Customers/CustomerList'} className="nav-link">Customers</Link>
              <Link to={'/Logins/LoginList'} className="nav-link">Logins</Link>
              <Link to={'/Products/ProductList'} className="nav-link">Products</Link>
              <Link to={'/Employees/EmployeeList'} className="nav-link">Employees</Link>

            </Nav>
            <Nav>
              <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/Customers" component={CustomerList} />
          <Route path="/Logins" component={LoginList} />
          <Route path="/Products" component={ProductList} />
          <Route path="/Employees" component={EmployeeList} />
          <Route path="/" component={Homepage} />
          
        </Switch>
      </Router>
    </div>
  )
}
else{
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">Northwind</Navbar.Brand>
          <Nav className="mr-auto">
            <Link to={'/'} className='nav-link'>Home</Link>
          </Nav>
          <Nav>
            <LoginForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Nav>
        </Navbar>

          <Switch>
            <Route path='/' component={Homepage} />
          </Switch>
      </Router>
      
    </div>
  )
}

};

export default App;

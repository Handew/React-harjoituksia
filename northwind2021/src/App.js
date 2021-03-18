import React, { useState } from "react";
import "./App.css";
import Laskuri from "./laskuri";
import CustomerList from "./Customers/CustomerList";
import LoginList from "./Logins/LoginList";
import EmployeeList from "./Employees/EmployeeList"
import ProductList from "./Products/ProductList"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  // const [luku, setLuku] = useState(0);


  // setTimeout(() => {
  //   setLuku(luku + 1)
  // }, 1000
  // )

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
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/Customers" component={CustomerList} />
          <Route path="/Logins" component={LoginList} />
          <Route path="/Products" component={ProductList} />
          <Route path="/Employees" component={EmployeeList} />
          
        </Switch>
      </Router>
      
      {/* <header className="App-header">
        <h1>
          Northwind osakkeen arvo = {luku}
          {luku} €
        </h1>
        <Laskuri luku={luku} setLuku={setLuku} />
        <br></br>

      </header> */}




    </div>
  );
};

export default App;

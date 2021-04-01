/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "../App.css";
import EmployeeService from "../services/employee";
import Employee from "./Employee";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit";
import Message from "../Message";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [lisäysTila, setLisäystila] = useState(false);
  const [muokkausTila, setMuokkaustila] = useState(false);
  const [muokattavaEmployee, setMuokattavaEmployee] = useState({});

  const [showMessage, setShowMessage] = useState(false);
  const [isPositive, setIsPositive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    EmployeeService.getAll().then((data) => {
      setEmployees(data);
    });
  }, [lisäysTila, muokkausTila]);

  const handleDeleteClick = (id) => {
    const employee = employees.find((employee) => employee.employeeId === id);

    // Poiston varmistus kyselyikkuna
    const confirm = window.confirm(
      `Haluatko todella poistaa: ${employee.lastName}:n pysyvästi?`
    );

    if (confirm) {
      EmployeeService.remove(id)
        .then((response) => {
          if (response.status === 200) {
            // Poistetaan employee statesta
            setEmployees(
              employees.filter((filtered) => filtered.employeeId !== id)
            );

            setMessage(`${employee.lastName}:n poisto onnnistui!`);
            setIsPositive(true);
            setShowMessage(true);
            window.scrollBy(0, -10000);

            setTimeout(() => {
              setShowMessage(false);
            }, 4000);
          }
        })

        .catch((error) => {
          console.log(error);
          setMessage(`Tapahtui virhe: ${error}.`);
          setIsPositive(false);
          setShowMessage(true);

          setTimeout(() => {
            setShowMessage(false);
          }, 7000);
        });
    } else {
      // JOS KÄYTTÄJÄ EI VAHVISTANUT POISTOA:
      setMessage("Poisto peruutettu");
      setIsPositive(true);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  };

  const handleEditClick = (employee) => {
    setMuokattavaEmployee(employee);
    setMuokkaustila(true);
  };

  return (
    <>
      <div className="content">
        <h1>
          <nobr> Employees</nobr>

          <button id="nappi" onClick={() => setLisäystila(true)}>
            Add new
          </button>
        </h1>

        {showMessage && <Message message={message} isPositive={isPositive} />}

        {employees && !lisäysTila && !muokkausTila && (
          <table className="center">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Title</th>
                <th>Address</th>
                <th>City</th>
                <th>Postal code</th>
                <th>Country</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <Employee
                  key={employee.employeeId}
                  employee={employee}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                />
              ))}
            </tbody>
          </table>
        )}

        {!employees && <p>Loading...</p>}

        {lisäysTila && (
          <EmployeeAdd
            setLisäystila={setLisäystila}
            employees={employees}
            setEmployees={setEmployees}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}

        {muokkausTila && (
          <EmployeeEdit
            setMuokkaustila={setMuokkaustila}
            muokattavaEmployee={muokattavaEmployee}
            employees={employees}
            setEmployees={setEmployees}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIsPositive={setIsPositive}
          />
        )}
      </div>
    </>
  );
};

export default EmployeeList;

import React, { useState } from 'react'
import './App.css';
import Laskuri from './laskuri'
import CustomerList from './CustomerList'

const App = () => {

  const [luku, setLuku] = useState(0)

  // setTimeout(() => {
  //   setLuku(luku + 1)
  // }, 1000
  // )

  return (
    <div className="App">
      <header className="App-header">
        <h1>Northwind osakkeen arvo = {luku}{luku} €</h1>
        <Laskuri luku={luku} setLuku={setLuku}/>
        <CustomerList />

      </header>

    </div>
  );
}

export default App;

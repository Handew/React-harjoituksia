import React, { useState } from 'react'
import './App.css';
import Laskuri from './laskuri'

const App = () => {

  const [luku, setLuku] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Northwind</h1>
        <Laskuri luku={luku} setLuku={setLuku}/>
      </header>

    </div>
  );
}

export default App;

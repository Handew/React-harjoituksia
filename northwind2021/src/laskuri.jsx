import './App.css';

const Laskuri = ({luku, setLuku}) => {
  return (
    <div>
        <h2>{luku}</h2>
        <button id="nappi" onClick={() => setLuku(luku+ 1)}>+ 1</button>
        <button id="nappi" onClick={() => setLuku(luku- 1)}>- 1</button>
        <button id="nappi" onClick={() => setLuku(0)}>Nollaa laskuri</button>
    </div>
  );
}

export default Laskuri;
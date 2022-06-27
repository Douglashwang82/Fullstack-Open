import { useState, useEffect } from "react";
import axios from "axios";


const OneResult = ({ target }) => {
  return (
    <>
      <h1>{target.name.common}</h1>
      <p>capital {target.capital[0]}</p>
      <p>area {target.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(target.languages).map((l) =>
          <li key={l}>
            {l}
          </li>
        )}
      </ul>
      <img src={target.flags.png} alt="flag" />
    </>
  )
}

const LessTenResults = ({ targets }) => {
  return (
    <>
      {targets.map(c => <p key={c.name.common}>{c.name.common}</p>)}
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [target, setTarget] = useState('');
  const handleTarget = (e) => setTarget(e.target.value);
  
  useEffect(() => {
    console.log("Fetching countries");
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
        console.log("Request Fullfilled");
        setCountries(response.data)
      });
    }, [])
    
    const filtered = countries.filter(e => e.name.common
      .toLowerCase()
      .includes(target.toLowerCase()));
    return (
    <div className="App">
      <label>found countries</label>
      <input value={target} onChange={handleTarget} />
      {
        target === '' ?
          ''
          :
          filtered.length > 10 ?
            <p>Too many matches, specify another filter</p>
            :
            filtered.length === 1 ?
              <OneResult target={filtered[0]} />
              :
              filtered.length <= 10 && filtered.length > 0 ?
                <LessTenResults targets={filtered} />
                :
                <p>No result.</p>
      }
    </div>
  );
}
export default App;


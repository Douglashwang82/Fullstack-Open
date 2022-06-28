import { useState, useEffect } from "react";
import axios from "axios";

const { REACT_APP_WEATHER_API_KEY, REACT_APP_WEATHER_API_BASE } = process.env;


const OneResult = ({ target }) => {
  const [temp, setTemp] = useState();
  const [wind, setWind] = useState();
  const [icon, setIcon] = useState();
  useEffect(() => {
    axios
      .get(`${REACT_APP_WEATHER_API_BASE}weather?q=${target.name.common}&units=metric&APPID=${REACT_APP_WEATHER_API_KEY}`)
      .then(res => {
        console.log('Resuest fulfilled');
        setTemp(res.data.main.temp);
        setWind(res.data.wind.speed);
        setIcon(res.data.weather[0].icon);
      })
  }, []);
  console.log(process.env.React_App_WEATHER_API_BASE);
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

      <h1>Weather in {target.name.common}</h1>
      <p>{`temparature ${temp} Celcius`}</p>
      {icon ?
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
        :
        ""
      }
      <p>wind {wind} m/s</p>
    </>
  )
}

const LessTenResults = ({ targets, handler }) => {
  return (
    <>
      {targets.map(c => {
        const curr = c.name.common;
        return (
          <>
            <p>
              <span key={c.name.common}>{c.name.common}</span>
              <button onClick={() => handler(curr)}>show</button>
            </p>
          </>
        )
      })}
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [target, setTarget] = useState('');
  const handleTarget = (e) => setTarget(e.target.value);
  const handleButtonTarget = (frombtn) => setTarget(frombtn);
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
                <LessTenResults handler={handleButtonTarget} targets={filtered} />
                :
                <p>No result.</p>
      }
    </div>
  );
}
export default App;


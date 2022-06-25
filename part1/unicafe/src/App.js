import {useState} from 'react';

const Button = ({handler, children}) => {
  return (
    <button onClick={handler}>{children}</button>
  )  
}  

const Action = ({handleBad, handleGood, handleNeutral}) => {
  return(
    <>
    <h1>give feedback</h1>
    <Button handler={handleGood}>good</Button>
    <Button handler={handleNeutral}>neutral</Button>
    <Button handler={handleBad}>bad</Button>
    </>
  )
}

const StatisticLine = ({text, value}) => {
return (
  <>
  <p>{text} {value}</p>
  </>
)
}

const Statistic = ({good, neutral, bad, all, average, positive}) => {

  return(
    <div>
    <h1>statistics</h1>
    <table>
      <tbody>

      <tr><td><StatisticLine text="good" value={good} /></td></tr>
      <tr><td><StatisticLine text="neutral" value={neutral} /></td></tr>
      <tr><td><StatisticLine text="bad" value={bad} /></td></tr>
      <tr><td><StatisticLine text="all" value={all} /></td></tr>
      <tr><td><StatisticLine text="neutral" value={average} /></td></tr>
      <tr><td><StatisticLine text="positive" value={parseFloat(positive * 100).toFixed(2)+"%"} /></td></tr>
      </tbody>
    </table>
    </div>
  )
}


function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  function countAll(){
    return good + neutral + bad;
  }

  function countAvg() {
    const all = countAll();
    if (all === 0) return 0;
    return (good - bad) / all;
  }

  function countPositive() {
    const all = countAll();
    if (all === 0) return 0;
    return good / countAll();
  }

  return (
    <div className="App">
    <Action handleBad = {handleBad} handleGood={handleGood} handleNeutral={handleNeutral}/>
    {countAll() === 0 ? 
    <p>No feedback given</p> 
    :
    <Statistic good={good} neutral={neutral} bad={bad} all={countAll()} average={countAvg()} positive={countPositive()}/>
    }
    </div>
  );
}

export default App;

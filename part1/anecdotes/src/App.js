import { useState,useEffect } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]


const Vote = ({selected, handlePoints, handleSelected, points}) => {
  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points} points</p>
      <button onClick={handlePoints}>vote</button>
      <button onClick={handleSelected}>next anecdote</button>
    </div>
  )
}

const MostVote = ({most, points}) => {
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      {
        points === 0 ?
      <p>no vote yet</p>:
      <>
      <p>{anecdotes[most]}</p>
      <p>had {points} points</p>
      </>
}
    </div>
  )
}

const App = () => {   
  const initial_points = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat);
  const [selected, setSelected] = useState(0)
  const [points ,setPoints] = useState(initial_points);
  const [most, setMost] = useState(0);

  const getRandomIndex = () => {
    let temp = Math.floor(Math.random() * anecdotes.length);
    while (temp === selected) {
      temp = Math.floor(Math.random() * anecdotes.length);
    }
    return temp;
  }
  
  const handleSelected = () => setSelected(getRandomIndex());

  const handlePoints = () => {
    let copy = {...points};
    copy[selected] += 1;
    setPoints(copy);
  }

  const updateMost = () => {
    if (points[selected] > points[most]) setMost(selected);
  }
  
  updateMost();
  return (
    <div>
      <Vote handleSelected={handleSelected} handlePoints={handlePoints} selected={selected} points={points[selected]}/>
      <MostVote most={most} points={points[most]}/>
    </div>
  )
}

export default App
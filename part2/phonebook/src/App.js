import { useEffect } from 'react';
import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  const handleOnChange = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.map((e) => e.name).includes(newName)) {
      alert(`${newName} is already in the phonebook.`);
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
  }
  const filtered = persons.filter(e => e.name !== filter);
  useEffect(() => {
    console.log('Fetching Notes');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('Requse fulfilled');
        setPersons(response.data);
      })
  }, []) // if no [], it will be a infinite loop.
  return (
    <div>

      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        handleOnChange={handleOnChange}
        newNumber={newNumber}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>

      <Persons filtered={filtered} />


    </div>
  )
}

export default App
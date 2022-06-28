import { useEffect } from 'react';
import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneBookServices from './phonebookService';

const Notification = ({message}) => {
  if (message === '') return '';
  return(
    <div style={{color:"red", border:"solid",}}>{message}</div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [lastId, setLastId] = useState();
  const [message, setMessage] = useState('');

  const handleOnChange = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newObject = {
      "name": newName,
      "number": newNumber,
      "id": lastId,
    }
    const found = persons.find((e) => e.name === newName);

    if (found) {
      if (!window.confirm(`update ${newName} with new value?`)) return;
      phoneBookServices
        .updatePhoneBook(found.id, { ...newObject, "id": found.id })
        .then(res => setPersons(
          persons.map(e => e.name !== newName ? e : { ...newObject, "id": found.id })
        ))
        .catch(err => 
          {
            setMessage('target already been delete')
            setPersons(persons.filter(e => e.id !== found.id));
          });
      return
    }

    phoneBookServices
      .addPhoneBook(newObject)
      .then(res => {
        setPersons(persons.concat(newObject));
        setLastId(lastId + 1);
      })
      .catch(err => alert(err.message));
      setMessage('added new obj');
  }

  const handleDelete = id => {
    if (!window.confirm(`delete ${persons.find(e => e.id === id).name}?`)) return;
    phoneBookServices
      .deletePhoneBook(id)
      .then(res =>
        setPersons(persons.filter(e => e.id !== id)))
        .catch(err => setMessage('has already been deleted'))

  }




  const filtered = persons.filter(e => e.name !== filter);



  useEffect(() => {
    console.log('Fetching Notes');
    phoneBookServices
      .getPhoneBook().then(res => {
        console.log("here");
        setLastId(res[res.length - 1].id + 1);
        setPersons(res)
      });
  }, []) // if no [], it will be a infinite loop.

  return (
    <div>

      <h2>Phonebook</h2> 
      <Notification message={message}/>
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

      <Persons filtered={filtered} handleDelete={handleDelete} />


    </div>
  )
}

export default App
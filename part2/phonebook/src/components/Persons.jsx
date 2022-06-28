import React from 'react'

const Persons = ({filtered, handleDelete}) => {
  return (
    <>
    {filtered.map((e) => { return ( 
      <p key={e.name}>{e.name} {e.number}
      <button onClick={() => handleDelete(e.id)}>delete</button>
      </p> 
      )
    })}
    </>
  )
}

export default Persons
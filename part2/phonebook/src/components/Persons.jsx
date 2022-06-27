import React from 'react'

const Persons = ({filtered}) => {
  return (
    <>
    {filtered.map((e) => { return <p key={e.name}>{e.name} {e.number}</p> })}
    </>
  )
}

export default Persons
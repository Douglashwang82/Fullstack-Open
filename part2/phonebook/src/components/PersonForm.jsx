import React from 'react'

const PersonForm = ({newName, handleOnChange, newNumber, handleNumber, handleSubmit}) => {
  return (
    <>
    <form onSubmit={(e) => handleSubmit(e)}>
    <div>
      name: <input value={newName} onChange={handleOnChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    </>
  )
}

export default PersonForm
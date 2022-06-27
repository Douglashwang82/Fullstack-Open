import React from 'react'

const Filter = ({filter, handleFilter}) => {
  return (
    <>
    <label>filter shown with</label>
    <input value={filter} onChange={handleFilter} />
    </>
  )
}

export default Filter
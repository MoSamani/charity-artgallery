import React from 'react'

const Textarea = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <textarea
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Textarea

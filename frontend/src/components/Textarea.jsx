import React from 'react'
import './Textarea.css'

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
        className='form-textarea'
      />
    </div>
  )
}

export default Textarea

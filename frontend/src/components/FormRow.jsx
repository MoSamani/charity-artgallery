import React from 'react'

const FormRow = ({ type, name, value, handleChange, labelText, checked }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        // value={value}
        {...(type !== 'file' && type !== 'checkbox' && { value })}
        {...(type === 'checkbox' && { checked })}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  )
}
export default FormRow

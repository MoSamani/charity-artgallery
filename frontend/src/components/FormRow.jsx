import React from 'react'

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  checked,
  errorMessage,
}) => {
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}
export default FormRow

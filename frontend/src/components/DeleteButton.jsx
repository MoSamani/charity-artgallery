import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../features/user/userSlice'
import './DeleteButton.css';

function DeleteUserButton() {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)

  const handleDelete = () => {
    dispatch(removeUser({ email: user.email }))
    setShowModal(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="Test"
      >
        Remove user
      </button>

      {showModal && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={() => setShowModal(false)}>cancel</button>
          </div>
        </div>
      )}
    </>
  )
}

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(22, 14, 14, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const modalStyles = {
  background: 'white',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
}

export default DeleteUserButton

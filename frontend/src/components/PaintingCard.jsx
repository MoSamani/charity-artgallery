import React from 'react'
import FavoriteIcon from './FavoriteIcon'

function PaintingCard({ painting, onClick }) {
  return (
    <div
      className="painting-card"
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '8px',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <img
        src={painting.image1_url}
        onClick={() => onClick(painting)}
        alt={''}
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'contain',
          borderRadius: '8px',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <p style={{ fontSize: '14px', color: '#666' }}>{painting.size}</p>{' '}
          <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {`${painting.createdBy.firstname} ${painting.createdBy.lastname}`}
          </h3>{' '}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
            €{painting.mprise}
          </p>{' '}
          <FavoriteIcon itemId={painting._id} />
        </div>
      </div>
    </div>
  )
}

export default PaintingCard

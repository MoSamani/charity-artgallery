import React, { useState } from 'react'
import './filter.css'

function Filter({
  selectedSize,
  setSelectedSize,
  sizes,
  selectedMedium,
  setSelectedMedium,
  mediums,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  // برای باز و بسته شدن فیلتر قیمت
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false)

  return (
    <div
      className="filter-container"
      style={{
        display: 'flex',
        justifyContent: 'center', // مرکز کردن فیلترها افقی
        alignItems: 'center', // مرکز کردن فیلترها عمودی
        flexWrap: 'wrap', // اگر جا نشد، به خط بعدی بروند
        gap: '20px', // فاصله بین فیلترها
      }}
    >
      {/* فیلتر سایز */}
      <div className="filter-item size-filter">
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="filter-select"
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* فیلتر مدیوم */}
      <div className="filter-item medium-filter">
        <select
          value={selectedMedium}
          onChange={(e) => setSelectedMedium(e.target.value)}
          className="filter-select"
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="">All Mediums</option>
          {mediums.map((medium) => (
            <option key={medium} value={medium}>
              {medium}
            </option>
          ))}
        </select>
      </div>

      {/* فیلتر قیمت */}
      <div
        className="filter-item price-filter-container"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <button
          onClick={() => setIsPriceFilterOpen(!isPriceFilterOpen)}
          className="price-filter-toggle"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            color: 'black',
            border: '1px solid #000',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            width: 'auto',
            display: 'inline-block',
          }}
        >
          {isPriceFilterOpen ? 'Close Price Filter' : 'Open Price Filter'}
        </button>

        {/* نمایش فیلدهای قیمت در صورت باز بودن فیلتر */}
        {isPriceFilterOpen && (
          <div
            className="price-range-inputs"
            style={{
              display: 'flex',
              gap: '10px', // فاصله بین فیلدهای قیمت
              marginLeft: '20px', // فاصله از دکمه
            }}
          >
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="price-input"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                color: 'black',
                border: '1px solid #000',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                width: '100px', // عرض فیلدها بیشتر از 50px
                margin: '8px 0px 0px 0px',
              }}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="price-input"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                color: 'black',
                border: '1px solid #000',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                width: '100px', // عرض فیلدها بیشتر از 50px
                margin: '8px 0px 0px 0px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Filter

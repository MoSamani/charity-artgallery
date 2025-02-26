import React, { useState } from "react";
import './filter.css';

function Filter({ filters, setFilters, sizes, techniques, artists }) {
  const [showPriceSlider, setShowPriceSlider] = useState(false);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: Number(value),
    });
  };

  const togglePriceSlider = () => {
    setShowPriceSlider(!showPriceSlider);
  };

  const handleSizeChange = (e) => {
    setFilters({ ...filters, size: e.target.value });
  };

  const handleTechniqueChange = (e) => {
    setFilters({ ...filters, technique: e.target.value });
  };

  const handleArtistChange = (e) => {
    setFilters({ ...filters, artist: e.target.value });
  };

  const showAllImages = () => {
    setFilters({ minPrice: 0, maxPrice: 50, size: "", technique: "", artist: "" });
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={showAllImages}>
        All
      </button>

      <select value={filters.size} onChange={handleSizeChange}>
        <option value="">Size</option>
        {(sizes || []).map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>

      <select value={filters.technique} onChange={handleTechniqueChange}>
        <option value="">Technique</option>
        {(techniques || []).map((technique, index) => (
          <option key={index} value={technique}>
            {technique}
          </option>
        ))}
      </select>

      <select value={filters.artist} onChange={handleArtistChange}>
        <option value="">Artist</option>
        {(artists || []).map((artist, index) => (
          <option key={index} value={artist}>
            {artist}
          </option>
        ))}
      </select>

      <button className="filter-button" onClick={togglePriceSlider}>
        Price
      </button>

      {showPriceSlider && (
        <div className="price-filter">
          {/* Price range inputs */}
          <div className="price-inputs">
            <div>
              <span>Lowest price</span>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handlePriceChange}
                min="0"
                max="500"
              />
              €
            </div>
            <div>—</div>
            <div>
              <span>Highest price</span>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                min="0"
                max="500"
              />
              €
            </div>
          </div>

          {/* Range Slider */}
          <div className="range-slider">
            <input
              type="range"
              name="minPrice"
              min="0"
              max="500"
              value={filters.minPrice}
              onChange={handlePriceChange}
              className="range-input min-range"
            />
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="500"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="range-input max-range"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;

import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearchClick = () => {
    handleSearch(query);  // فراخوانی تابع handleSearch که از Home به اینجا منتقل شده است
  };

  const handleClearSearch = () => {
    setQuery(""); // پاک کردن مقدار query
    handleSearch(""); // ریست کردن جستجو
    setNoResults(false); // مخفی کردن پیام عدم نتایج
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder=" 🔍   Suche nach Techniken"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        {/* نمایش ضربدر داخل فیلد جستجو */}
        {query && (
          <button className="clear-button" onClick={handleClearSearch}>
            ✖
          </button>
        )}
      </div>
     

      {/* نمایش پیام زمانی که هیچ نتیجه‌ای یافت نشد */}
      {noResults && <p className="no-results-message">Keine Ergebnisse gefunden</p>}
    </div>
  );
}

export default SearchBar;

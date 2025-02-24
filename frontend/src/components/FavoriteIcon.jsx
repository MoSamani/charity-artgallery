import React, { useState } from "react";

function FavoriteIcon({ itemId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

   
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!isFavorite) {
      favorites.push(itemId);
    } else {
      favorites = favorites.filter((id) => id !== itemId);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <span
      onClick={toggleFavorite}
      style={{ color: isFavorite ? "red" : "gray", cursor: "pointer", fontSize: "20px" }}
    >
      ♥
    </span>
  );
}

export default FavoriteIcon;

import React from "react";
import FavoriteIcon from "./FavoriteIcon";

function PaintingCard({ painting }) {
  return (
    <div
      className="painting-card"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        width: "250px", // تنظیم عرض کارت
        display: "flex",
        flexDirection: "column", // کارت به صورت عمودی
        height: "auto",
      }}
    >
      {/* تصویر */}
      <img
        src={`data/images/${painting.image}`} 
        alt={painting.artist}
        style={{
          width: "100%",
          height: painting.imageHeight || "auto", // تنظیم ارتفاع تصویر
          borderRadius: "8px",
        }}
      />
      
      {/* بخش چپ و راست: سایز و اسم و قیمت و لایک */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // برای تراز افقی دو بخش (چپ و راست)
          alignItems: "flex-start", // تراز عمودی به بالا
          marginTop: "10px",
        }}
      >
        {/* بخش چپ: سایز و اسم */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>{painting.size}</p> {/* سایز اثر */}
          <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{painting.artist}</h3> {/* اسم اثر */}
        </div>

        {/* بخش راست: قیمت و لایک */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>€{painting.price}</p> {/* قیمت */}
          <FavoriteIcon itemId={painting.id} /> {/* لایک */}
        </div>
      </div>
    </div>
  );
}

export default PaintingCard;

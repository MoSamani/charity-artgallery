import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.jsx";
import PaintingCard from "../../components/PaintingCard";
import Filter from "../../components/Filter.jsx";
import Countdown from "../../components/Countdown.jsx";
import SearchBar from "../../components/SearchBar"; 
import Footer from '../../components/Footer';
import "./Home.css";

function Home() {
  const [paintings, setPaintings] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filters, setFilters] = useState({
    size: "",
    minPrice: "",
    maxPrice: "",
    technique: "",
    artist: "",
  });
  const [filteredPaintings, setFilteredPaintings] = useState([]);

  useEffect(() => {
    fetch("/data/painting.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch paintings");
        }
        return response.json();
      })
      .then((data) => {
        if (data.paintings && Array.isArray(data.paintings)) {
          setPaintings(data.paintings);
          setFilteredPaintings(data.paintings); // ست کردن تصاویر فیلتر شده به صورت پیش‌فرض
        } else {
          console.error("Invalid paintings data");
        }

        if (data.sizes && Array.isArray(data.sizes)) {
          setSizes(data.sizes);
        }

        if (data.techniques && Array.isArray(data.techniques)) {
          setTechniques(data.techniques);
        }

        if (data.artists && Array.isArray(data.artists)) {
          setArtists(data.artists);
        }
      })
      .catch((error) => console.error("Error fetching paintings:", error));
  }, []);

  const handleSearch = (query) => {
    // فیلتر کردن فقط بر اساس تکنیک
    const filtered = paintings.filter((painting) => {
      if (painting.technique && typeof painting.technique === "string") {
        return painting.technique.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
    setFilteredPaintings(filtered);
  };

  const resetFilters = () => {
    // وقتی کاربر روی دکمه "All" کلیک کرد
    setFilters({
      size: "",
      minPrice: "",
      maxPrice: "",
      technique: "",
      artist: "",
    });
    setFilteredPaintings(paintings);  // بازنشانی تصاویر به حالت اولیه
  };

  const filteredPaintingsList = filteredPaintings.filter((painting) => {
    const isSizeMatch = filters.size ? painting.size === filters.size : true;
    const isPriceMatch =
      (filters.minPrice ? painting.price >= filters.minPrice : true) &&
      (filters.maxPrice ? painting.price <= filters.maxPrice : true);
    const isTechniqueMatch =
      filters.technique ? painting.technique === filters.technique : true;
    const isArtistMatch =
      filters.artist ? painting.artist === filters.artist : true;

    return isSizeMatch && isPriceMatch && isTechniqueMatch && isArtistMatch;
  });

  return (
    <div>
      <div className="home-container">
        <Navbar />
      </div>
      <div style={{ textAlign: "center", margin: "20px 0", fontSize: "18px", fontWeight: "bold" }}>
        <Countdown />
      </div>
       {/* اضافه کردن جستجو */}
      <SearchBar handleSearch={handleSearch} />
      <Filter
        filters={filters}
        setFilters={setFilters}
        sizes={sizes}
        techniques={techniques}
        artists={artists}
        resetFilters={resetFilters}  // ارسال تابع برای بازنشانی فیلترها
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredPaintingsList.length > 0 ? (
          filteredPaintingsList.map((painting) => (
            <PaintingCard key={painting.id} painting={painting} />
          ))
        ) : (
          <p>No paintings match the selected filters.</p>
        )}
      </div>
     <div>
     <Footer />
     </div>
      
    </div>
  );
}

export default Home;

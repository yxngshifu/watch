import React, { useState } from "react";
import posterImage from "./Poster.png";
import './styles.css';


function Hero({ searchMovies, searchKey, setSearchKey }) {
  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(e);
  };


  return (
    <div className="hero" style={{ backgroundImage: `url(${posterImage})` }}>
      <div className="hero-content max-center">
         <form onSubmit={(e) => { e.preventDefault(); searchMovies(e); }}>
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="What do you want to watch?"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default Hero;

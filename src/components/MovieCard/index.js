import React, { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { id, title, release_date } = movie;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div data-testid="movie-card" className="movie-card">
      <Link to={`/movie/${id}`}>
        <img
          data-testid="movie-poster"
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={`${title} Poster`}
        />
      </Link>
      <h2 data-testid="movie-title">{title}</h2>
      <p data-testid="movie-release-date">Release Date: {release_date}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}

export default MovieCard;

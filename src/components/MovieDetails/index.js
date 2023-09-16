import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function MovieDetails({ IMAGE_PATH }) {
  const { id } = useParams();
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = 'e31c181561c78ddc082f76db470776f5';

  const [movie, setMovie] = useState(null);
   

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <img
        src={`${IMAGE_PATH}/${movie.backdrop_path}`}
        alt={`${movie.title} Backdrop`}
      />
      <h1 data-testid="movie-title">{movie.title}</h1>
      <p data-testid="movie-release-date">Release Date (UTC): {movie.release_date}</p>
      <p data-testid="movie-runtime">Runtime (minutes): {movie.runtime}</p>
      <p data-testid='vote-average'>{movie.vote_average}</p>
      <p data-testid="movie-overview">{movie.overview}</p>
      <p data-testid='vote-average'>{movie.credits}</p>
    </div>
  );
}

export default MovieDetails;

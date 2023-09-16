import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import './App.css'; 
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import YouTube from "react-youtube";
import Hero from "./components/Hero/Hero";

function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = 'e31c181561c78ddc082f76db470776f5';
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(false);

  const toggleFavorite = (movie) => {
    if (favorites.includes(movie)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Function to fetch movie details including videos
  const fetchMovieDetails = async (movieId) => {
    try {
      const { data } = await axios.get(`${API_URL}/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'videos',
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const fetchTopRatedMovies = async (searchKey = "") => {
    try {
      const type = searchKey ? "search/movie" : "movie/popular";
      const { data: { results } } = await axios.get(`${API_URL}/${type}`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });

      const limitedResults = results.slice(0, 10);

      // Fetch movie details for each movie, including trailers and videos
      const moviesWithDetails = await Promise.all(
        limitedResults.map(async (movie) => {
          const data = await fetchMovieDetails(movie.id);
          return data;
        })
      );

      setMovies(moviesWithDetails);
    } catch (error) { 
      if (error.response) {
        console.error("Error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  

  const selectMovie = async (movie) => {
    const data = await fetchMovieDetails(movie.id);
    if (data) {
      setSelectedMovie(data);
      setPlayTrailer(false); // Reset playTrailer state
    }
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, [fetchTopRatedMovies]);

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie} 
        selectMovie={() => selectMovie(movie)} // Pass movie object here
        toggleFavorite={() => toggleFavorite(movie)}
      />
    ))
  );

  const searchMovies = (e) => {
    e.preventDefault();
    fetchTopRatedMovies(searchKey);
  }

  const renderTrailer = () => {
    if (selectedMovie.videos && selectedMovie.videos.results) {
      const trailer = selectedMovie.videos.results.find(vid => vid.type === 'Trailer');
      if (trailer) {
        return (
          <YouTube videoId={trailer.key} />
        );
      }
    }
    return null;
  };

  return (
    <Router>
      <div className="App">
        {playTrailer && renderTrailer()}
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails selectedMovie={selectedMovie} IMAGE_PATH={IMAGE_PATH} />} />
          <Route path="/" element={
            <>
              <Hero searchMovies={searchMovies} searchKey={searchKey} setSearchKey={setSearchKey} />
              <div className="container">
                {renderMovies()}
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

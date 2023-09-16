import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import './App.css'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = 'e31c181561c78ddc082f76db470776f5';
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movie) => {
  if (favorites.includes(movie)) {
    // If the movie is already in favorites, remove it
    setFavorites(favorites.filter((fav) => fav.id !== movie.id));
  } else {
    // If the movie is not in favorites, add it
    setFavorites([...favorites, movie]);
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

      // Limit the number of movies to 10
      const limitedResults = results.slice(0, 10);

      setSelectedMovie(limitedResults[0]);
      setMovies(limitedResults);
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

  useEffect(() => {
    fetchTopRatedMovies(); // Initial fetch without searchKey
  }, []);

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie} // Make sure to pass the limited movie data here
        toggleFavorite={() => toggleFavorite(movie)}
      />
    ))
  );

  const searchMovies = (e) => {
    e.preventDefault();
    fetchTopRatedMovies(searchKey);
  }

  return (
    <Router>
      <div className="App">
        <header className={"header"}>
          <form onSubmit={searchMovies}>
            <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder="What do you want to watch?" />
            <button type="submit">Search</button>
          </form>
        </header>
        <div className="hero" style={{backgroundImage: `url('${IMAGE_PATH}/${selectedMovie.backdrop_path}')`}}>
          <div className="hero-content max-center">
            <h1>{selectedMovie.title}</h1>
            {selectedMovie.overview ? <p>{selectedMovie.overview}</p> :null}
          </div>
        </div>
        <h1>Featured Movies</h1>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails IMAGE_PATH={IMAGE_PATH}/>} />
          <Route path="/" element={
            <div className="container">
              {renderMovies()}
            </div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

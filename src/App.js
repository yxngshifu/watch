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
    
    setFavorites(favorites.filter((fav) => fav.id !== movie.id));
  } else {
    
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
    fetchTopRatedMovies();
  }, []);

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie} 
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
      
        <div className="hero" style={{backgroundImage: `url('${IMAGE_PATH}/${selectedMovie.backdrop_path}')`}}>
           <form onSubmit={searchMovies}>
            <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder="What do you want to watch?" />
            <button type="submit">Search</button>
          </form>
          <div className="hero-content max-center">
            <h1>{selectedMovie.title}</h1>
            {selectedMovie.overview ? <p>{selectedMovie.overview}</p> :null}
          </div>

        </div>
          </header>
          <div className="heading">
          <h1 >Featured Movies</h1>
          </div>
        
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

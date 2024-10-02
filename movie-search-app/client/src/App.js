import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const PORT = process.env.port || 5000;


  useEffect(() => {
    setMovies([
        { imdbID: '1', Title: 'Test Movie 1', Poster: 'https://via.placeholder.com/150' },
        { imdbID: '2', Title: 'Test Movie 2', Poster: 'https://via.placeholder.com/150' }
    ]);
}, []);

    const searchMovies = async () => {
      setMessage("Searching for movies...");

      setTimeout(()=> {
        setMessage("");
      }, 2000);

        if (!query) return;

        try {
          const response = await axios.get(`http://localhost:${PORT}/api/movies?q=${query}`);
            console.log("API Response: ", response.data);
            setMovies(response.data.Search || []);
        } 
        catch (error) {
            console.error('Error fetching movies:', error);
        }

    };


  return (
    <div className="App">
      <header className="Movie Search">
        <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={searchMovies}>Search</button>

      {/* Display the message */}
      {message && <p>{message}</p>}

      <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-item">
                        <img src={movie.Poster} alt={movie.Title} />
                        <p>{movie.Title}</p>
                    </div>
                ))}
        </div>
      </header>
    </div>
  );
}

export default App;

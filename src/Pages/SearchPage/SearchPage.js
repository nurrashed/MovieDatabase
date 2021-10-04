import React, { useState, useEffect } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import classes from "./SearchPage.module.css";
import "./add.css";

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [overview, setOverview] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const Search_API = `https://api.themoviedb.org/3/search/movie?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&page=${page}&include_adult=false&query=`;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSearchText("");
  };

  const searchMovies = (Search_API, searchText) => {
    fetch(Search_API + searchText)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    searchMovies(Search_API, searchText);    
    // eslint-disable-next-line
  }, [page]);

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    searchMovies(Search_API, searchText);
  };

  const overviewShow = (e) => {
    window.scroll(0, 0);
    setSelectedMovieId(e.target.id);
    setOverview(e.target.dataset.value);
    getSimilarMovies(e.target.id);

    /* movies.forEach((movie) => {
      if (parseInt(e.currentTarget.id) === movie.id) {
        e.currentTarget.classList.add("listitem");
      }
    }); */
  };

  console.log(selectedMovieId);

  const getSimilarMovies = (selectedMovieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMovieId}/similar?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarMovies(data.results);
      });
  };

  const clearScreen = () => {
    setOverview("");
    setSimilarMovies([]);
  };

  return (
    <div>
      <div className={classes["main-div"]}>
        <div className={classes["left-side"]}>
          <div className={classes["left-side-container"]}>
            <div>
              <form onSubmit={handleOnSubmit}>
                <input
                  className={classes["input-container"]}
                  type="text"
                  placeholder="Search movie"
                  value={searchText}
                  onChange={handleOnChange}
                />
              </form>
            </div>
            <div className={classes["movie-container"]}>
              {movies &&
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    id={movie.id}
                    data-value={movie.overview}
                    onClick={overviewShow}
                  >
                    {movie.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={classes["right-side"]}>
          {overview && (
            <div className={classes["overview"]}>
              <h3>Overview</h3>
              {overview}
            </div>
          )}
          {overview && (
            <div className={classes["similar-movie"]}>
              <h3>Similar Movies</h3>
              {similarMovies.map((similarMovie) => (
                <div key={similarMovie.id}>{similarMovie.title}</div>
              ))}
            </div>
          )}
          {overview && (
            <button onClick={clearScreen}>
              Clear Overview and similar movie list
            </button>
          )}
        </div>
      </div>
      {<CustomPagination setPage={setPage} />}
    </div>
  );
}
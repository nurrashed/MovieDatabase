import React, { useState, useEffect } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import classes from "./SearchPage.module.css";
import "./add.css";

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [overview, setOverview] = useState("");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const Search_API = `https://api.themoviedb.org/3/search/movie?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&page=${page}&include_adult=false&query=${searchText}`;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSearchText("");
  };

  const searchMovies = async (Search_API) => {
    setIsLoading(true);
    const response = await fetch(Search_API);
    const data = await response.json();
    setMovies(data.results);
    setNumberOfPages(data.total_pages);
    setIsLoading(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (searchText.length >= 1) searchMovies(Search_API);
    // eslint-disable-next-line
  }, [searchText, page]);

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    if (searchText.length >= 1) searchMovies(Search_API);
  };

  const overviewShow = (e) => {
    window.scroll(0, 0);
    setOverview(e.target.dataset.value);
    getSimilarMovies(e.target.id);

    /* movies.forEach((movie) => {
      if (parseInt(e.currentTarget.id) === movie.id) {
        e.currentTarget.classList.add("listitem");
      }
    }); */
  };

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
              {!isLoading &&
                movies &&
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
              {isLoading && <p>Loading....</p>}
            </div>
          </div>
        </div>
        <div className={classes["right-side"]}>
          <h3>Movie Overview</h3>
          {overview && <div className={classes["overview"]}>{overview}</div>}
          {!overview && <p>No overview to show!</p>}

          <h3>Similar Movies</h3>
          {similarMovies.length > 0 && (
            <div className={classes["similar-movie"]}>
              {similarMovies.map((similarMovie) => (
                <div key={similarMovie.id}>{similarMovie.title}</div>
              ))}
            </div>
          )}
          {similarMovies.length === 0 && <p>No Similar movies found</p>}
          <button onClick={clearScreen}>
            Clear Overview and similar movie list
          </button>
        </div>
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </div>
  );
}

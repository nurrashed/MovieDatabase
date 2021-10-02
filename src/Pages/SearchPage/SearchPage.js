import React, { useState, useEffect } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";

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

  useEffect(() => {
    window.scroll(0, 0);

    fetch(Search_API + searchText)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      });
    // eslint-disable-next-line
  }, [page]);

  const handleOnChange = (e) => {
    setSearchText(e.target.value);

    fetch(Search_API + searchText)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      });
  };

  const overviewShow = (e) => {
    setSelectedMovieId(e.target.id);

    setOverview(e.target.dataset.value);

    getSimilarMovies(e.target.id);
  };

  const getSimilarMovies = (selectedMovieId) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMovieId}/similar?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Similar Movie List:", data.results);
        setSimilarMovies(data.results);
      });
  };

  const clearScreen = () => {
    setOverview("");
    setSimilarMovies([]);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Search Movie"
          value={searchText}
          onChange={handleOnChange}
        />
      </form>
      <div>
        <ul>
          {movies &&
            movies.map((movie) => (
              <li
                key={movie.id}
                id={movie.id}
                data-value={movie.overview}
                onClick={overviewShow}
              >
                {movie.title}
              </li>
            ))}
        </ul>
      </div>
      <div>{overview && overview}</div>
      <div>
        {similarMovies &&
          similarMovies.map((similarMovie) => (
            <div key={similarMovie.id}>{similarMovie.title}</div>
          ))}
      </div>
      <button onClick={clearScreen}>Clear</button>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

/* import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import classes from "./SearchPage.module.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CustomPagination from "./../../components/Pagination/CustomPagination";
import MovieCard from "./../../components/MovieCard/MovieCard";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [filteredOutput, setFilteredOutput] = useState([]);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setMovies(data.results);
      setNumberOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
    return () => {
      // This is its cleanup.
      setMovies({});
    };
  }, [page]);

  return (
    <>
      <div className="pageTitle">Search Page</div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "1rem 0" }}>
          <TextField
            style={{ flex: 1, backgroundColor: "gray" }}
            className={classes.searchBox}
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10, backgroundColor: "#4d9ce8" }}
          >
            <SearchIcon />
          </Button>
        </div>
      </ThemeProvider>
      <div className={classes.search}>
        {movies &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        {searchText && !movies && <h2>No Movies Found</h2>}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </>
  );
} */

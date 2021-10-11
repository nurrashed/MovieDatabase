import React, { useState, useEffect } from "react";
import axios from "axios";
import Genres from "../../components/Genres/Genres";
import MovieCard from "../../components/MovieCard/MovieCard";
import CustomPagination from "../../components/Pagination/CustomPagination";
import classes from "./MoviePage.module.css";
import useGenre from "../../customHooks/useGenre";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const genreforAPICall = useGenre(selectedGenres)

  const fetchMovies = async () => {
    setIsLoading(true)
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforAPICall}`
    );
    setAllMovies(data.results);
    setNumberOfPages(data.total_pages);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchMovies();    
    // eslint-disable-next-line
  }, [genreforAPICall, page]);

  return (
    <>
      <div className="pageTitle">Movie Page</div>
      {
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      }
      {!isLoading && <div className={classes.movie}>
        {allMovies &&
          allMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              date={movie.first_air_date}              
              vote_average={movie.vote_average}
            />
          ))}
      </div>}
      {isLoading && <h1>Loading...</h1>}
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </>
  );
}

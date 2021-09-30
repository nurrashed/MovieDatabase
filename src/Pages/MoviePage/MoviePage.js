import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./MoviePage.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import CustomPagination from "../../components/Pagination/CustomPagination";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );

    console.log(data);

    setAllMovies(data.results);
    setNumberOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    return () => {
      setPage({}); // This worked for me
    };
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <div className="pageTitle">Movie Page</div>
      {/* <Genres 
        type = 'movie'
      /> */}
      <div className={classes.movie}>
        {allMovies &&
          allMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              date={movie.first_air_date}
              media_type="movie"
              vote_average={movie.vote_average}
            />
          ))}
      </div>
      {numberOfPages > 1 && (
        <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </>
  );
}

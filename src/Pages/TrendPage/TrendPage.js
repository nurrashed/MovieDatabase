import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import CustomPagination from "../../components/Pagination/CustomPagination";
import classes from "./TrendPage.module.css";

export default function TrendPage() {
  const [weeklyTrendMovies, setWeeklyTrendMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrendMovies = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US&page=${page}&include_adult=false`
    );
    setWeeklyTrendMovies(data.results);
  };

  useEffect(() => {
    fetchTrendMovies();
  }, [page]);

  return (
    <>
      <div className="pageTitle">Trend Page</div>
      <div className={classes.trending}>
        {weeklyTrendMovies &&
          weeklyTrendMovies.map((weeklyTrendMovie) => (
            <MovieCard
              key={weeklyTrendMovie.id}
              id={weeklyTrendMovie.id}
              poster={weeklyTrendMovie.poster_path}
              title={weeklyTrendMovie.title}
              overview={weeklyTrendMovie.overview}
              date={weeklyTrendMovie.release_date}
              vote_average={weeklyTrendMovie.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage}/>
    </>
  );
}

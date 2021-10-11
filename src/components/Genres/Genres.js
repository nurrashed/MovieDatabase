import React, { useEffect } from "react";
import axios from "axios";
import classes from "./Genres.module.css";
import Box from "@mui/material/Box";
import { Chip } from "@material-ui/core";
/* import Chip from '@mui/material/Chip'; */

export default function Genres({
  type,
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
}) {

    //Add genre to the slectedGenre state and remove the selected genre from Genre state
  const addGenreToSelectedGenre = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  //
  const removeGenreFromSelectedGenre = (genre) => {
      setSelectedGenres(selectedGenres.filter(selected => selected.id !== genre.id))
      setGenres([...genres, genre]);
      setPage(1);
  }

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=7b642aed2489a8f6bfc80d04a2421e1c&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    //Wenever we are changing the page we want this genre component unmounted. Unmount means it should cancel
    // the API call. That is why I am doing this below code.
    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box sx ={{margin: "4px 6px"}}>
        {selectedGenres &&
          selectedGenres.map((genre) => (
            <Chip
              key={genre.id}
              className={classes['chip-style']}
              label={genre.name}
              variant="outlined"
              color="primary"
              clickable
              size="medium"
              onDelete = {() => removeGenreFromSelectedGenre(genre)}
            />
          ))}
        {genres &&
          genres.map((genre) => (
            <Chip
              key={genre.id}
              className={classes['chip-style']}
              label={genre.name}
              variant="outlined"
              color="secondary"
              clickable
              size="medium"
              onClick={() => addGenreToSelectedGenre(genre)}
            />
          ))}
      </Box>
    </>
  );
}

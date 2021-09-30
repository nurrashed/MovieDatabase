import React from "react";
import classes from "./CustomPagination.module.css";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const paginationTheme = createTheme({
  palette: {
    type: "light",
  },
});

export default function CustomPagination({ setPage, numberOfPages = 100 }) {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <ThemeProvider theme={paginationTheme}>
      <div className={classes.pagination}>
        <Pagination
          color="primary"
          count={numberOfPages}
          onChange={(event) => handlePageChange(event.target.textContent)}
        />
      </div>
    </ThemeProvider>
  );
}

import React from "react";
import classes from "./CustomPagination.module.css";
import Pagination from "@material-ui/lab/Pagination";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

export default function CustomPagination({ setPage, numberOfPages = 15 }) {
  
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.pagination}>
        <Pagination
          color="primary"
          count={numberOfPages}
          onChange={(event) => handlePageChange(event.target.textContent)}
          hideNextButton
          hidePrevButton
        />
      </div>
    </ThemeProvider>
  );
}

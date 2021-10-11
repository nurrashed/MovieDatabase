import React from "react";
import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../NotFound/NotFound";
import classes from "./MovieCard.module.css";

export default function MovieCard({
  id,
  poster,
  title,
  date,
  vote_average,
}) {
  return (
    <div className={classes.media}>
      <Badge
        badgeContent={vote_average}
        color={vote_average >= 7 ? "primary" : "secondary"}
      />
      <img
        className={classes.poster}
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className={classes.title}>{title}</b>
      <div className={classes.subTitle}>{date}</div>
    </div>
  );
}

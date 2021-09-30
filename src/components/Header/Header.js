import React from "react";
import classes from "./Header.module.css";

export default function Header(props) {
  return (
    <>
      <div onClick={()=>window.scroll(0,0)} className={classes.header}>Movie Database</div>
    </>
  );
}
